import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./badge.css";

// Importing the badge image properly
import badgeImage from '/clanpic.jpeg';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/allplayers");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-slate-100 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-56 h-56 bg-violet-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 top-1/4 left-1/3 transform -translate-x-1/2 animate-horizontal-blob"></div>
        <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 bottom-0 mb-26 right-1/2 transform translate-x-1/2 animate-horizontal-blob"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className="text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 underline-animation p-4"
            data-aos="fade-up"
          >
            Player Information
          </h2>
          <p
            className="mt-2 text-lg leading-8 text-gray-700"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Highest scoring players
          </p>
        </div>
        <div className="mx-auto mt-4 sm:mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 relative z-10">
          {posts.map((post, index) => {
            const formattedDate = new Date(post.createdAt).toLocaleDateString();

            return (
              <article
                key={post._id}
                className="flex max-w-xl flex-col items-start justify-between"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-gray-900 focus:outline-none rounded-lg border border-gray-700 p-8 w-full">
                  <img src="/image.png" style={{ width: 90 }} alt="Badge" className="badge-image" />
                  <img src={badgeImage} style={{ marginRight: 100 }} alt="Badge" className="badge-image" />
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={new Date(post.createdAt).toISOString()}
                      className="text-gray-500"
                    >
                      {formattedDate}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-700 px-3 py-1.5 font-medium text-gray-200">
                      Player Info
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-100 bg-purple-400/10 group-hover:bg-violet-400/10">
                      <span className="absolute inset-0" />
                      {post.name.toUpperCase()}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-white bg-purple-400/10 group-hover:bg-violet-400/10">
                      Tag: {post.playerTag}
                    </p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-red-200 bg-red-400/10 group-hover:bg-violet-400/10">
                      Score: {post.score}
                    </p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-emerald-300 bg-emerald-400/10 group-hover:bg-violet-400/10">
                      Reward Earned: ${post.rewardEarned}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      alt=""
                      src="/avatar.png"
                      className="h-10 w-15 rounded-full bg-gray-800"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-white">Player Info</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

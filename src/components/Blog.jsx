import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const posts = [
    {
      id: 1,
      title: 'Wachan the Great',
      href: '#',
      description:
        'scored - 3600   ',
     descriptionn:
        'account use 1   ',
        descriptionnn:
        'reward earn- 100$ ',
      date: 'june 7, 2024',
      datetime: '2020-03-16',
      category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
            category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },

      author: {
        name: 'Wachan',
        role: 'Admin',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
        id: 2,
        title: 'god',
        href: '#',
        description:
          'scored - 6900   ',
       descriptionn:
          'account use 10  ',
        date: 'june 7, 2024',
        descriptionnn:
          'reward - 1000$  ',
        datetime: '2020-03-16',
        category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
              category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
  
        author: {
          name: 'Wachan',
          role: 'Admin',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        id: 3,
        title: 'Wachan the Great',
        href: '#',
        description:
          'scored - 3600   ',
       descriptionn:
          'account use 1   ',
          descriptionnn:
          'reward earn- 100$ ',
        date: 'june 7, 2024',
        datetime: '2020-03-16',
        category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
              category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
  
        author: {
          name: 'Wachan',
          role: 'Admin',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        id: 4,
        title: 'Wachan the Great',
        href: '#',
        description:
          'scored - 3600   ',
       descriptionn:
          'account use 1   ',
          descriptionnn:
          'reward earn- 100$ ',
        date: 'june 7, 2024',
        datetime: '2020-03-16',
        category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
              category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
  
        author: {
          name: 'Wachan',
          role: 'Admin',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        id: 5,
        title: 'Wachan the Great',
        href: '#',
        description:
          'scored - 3600   ',
       descriptionn:
          'account use 1   ',
          descriptionnn:
          'reward earn- 100$ ',
        date: 'june 7, 2024',
        datetime: '2020-03-16',
        category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
              category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
  
        author: {
          name: 'Wachan',
          role: 'Admin',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        id: 6,
        title: 'Wachan the Great',
        href: '#',
        description:
          'scored - 3600   ',
       descriptionn:
          'account use 1   ',
          descriptionnn:
          'reward earn- 100$ ',
        date: 'june 7, 2024',
        datetime: '2020-03-16',
        category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
              category: { title: 'payments paypal', href: 'https://www.paypal.me/wachann' },
  
        author: {
          name: 'Wachan',
          role: 'Admin',
          href: '#',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      
    
  ]
  

  export default function Blog() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="bg-slate-100 py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute w-56 h-56 bg-violet-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 top-1/4 left-1/3 transform -translate-x-1/2 animate-horizontal-blob"></div>
                <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 bottom-0 mb-26 right-1/2 transform translate-x-1/2 animate-horizontal-blob"></div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 underline-animation p-4" data-aos="fade-up">
                        Payments info
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-700" data-aos="fade-up" data-aos-delay="100">
                        Highest paying clan in Clash Royale
                    </p>
                </div>
                <div className="mx-auto mt-4 sm:mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 relative z-10">
                    {posts.map((post, index) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="bg-gray-900 focus:outline-none rounded-lg border border-gray-700 p-8 w-full">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.datetime} className="text-gray-500">
                                        {post.date}
                                    </time>
                                    <a href={post.category.href} className="relative z-10 rounded-full bg-gray-700 px-3 py-1.5 font-medium text-gray-200 hover:bg-gray-600">
                                        {post.category.title}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-100 group-hover:text-orange-100">
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-white">{post.description}</p>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-emerald-200">{post.descriptionn}</p>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-red-300">{post.descriptionnn}</p>

                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-800" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-white">
                                            <a href={post.author.href}>
                                                <span className="absolute inset-0" />
                                                {post.author.name}
                                            </a>
                                        </p>
                                        <p className="text-gray-400">{post.author.role}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
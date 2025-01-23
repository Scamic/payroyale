import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";


const navigation = [
  { name: "Previous Week", href: "/", current: false },
  // { name: "Pay Stats", href: "/war-stats", current: false },
  { name: "Calendar", href: "/viewcalendar", current: false },
  { name: "About Devs", href: "/about", current: false },
  { name: "Live Score", href: "/live", current: false },
  { name: "Home", href: "/home", current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : 'https://payroyale-backend.vercel.app';

  useEffect(() => {
    const fetchUserDataFromSession = () => {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
        setRoles(parsedData.roles || []);
      } else {
        fetchUserDataFromBackend();
      }
    };

    const fetchUserDataFromBackend = async () => {
      const cookie = Cookies.get("clashroyale-session");
      if (cookie) {
        try {
          const response = await axios.get(
            `${baseURL}/api/user/profile`,
            {
              withCredentials: true,
            }
          );
          const userData = response.data;
          setUser(userData);
          setRoles(userData.roles || []);
          sessionStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          setRoles([]);
          sessionStorage.removeItem("user");
        }
      }
    };

    fetchUserDataFromSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post(
        `${baseURL}/api/auth/signout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setRoles([]);
      Cookies.remove("clashroyale-session");
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  

  return (
    
    
    <Disclosure as="nav" className="bg-slate-800 text-white px-4   h-full">
      
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
              />
              <XMarkIcon
                aria-hidden="true"
                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
              />
            </DisclosureButton>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center justify-center sm:justify-start">
              <img alt="Your Company" src="image.png" className="h-14 w-auto" />
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-purple-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-green-300 bg-gray-700 hover:bg-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 ">
                    Admin Tools
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-green-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/viewanalytics"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900"
                      >
                        View Analytics
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/addpaymentinfo"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900"
                      >
                        Auto Add Players Payouts
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/linkaccounts"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900"
                      >
                        Link Player Accounts
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              {!user && (
                <a
                  href="/signup"
                  className="text-purple-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Sign Up
                </a>
              )}
              {user && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSignOut}
                    className="text-red-500 hover:bg-red-700 hover:text-white hover:rounded-md rounded-md ms-7 px-3 py-2 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-50 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                <div className="px-4 py-2">
                  {user && (
                    <span className="block text-sm text-gray-700">
                      Email : {user.email} <br />
                      Role : ({roles.join(", ")})
                    </span>
                  )}
                </div>
                {!user && (
                  <button
                    onClick={handleSignup}
                    className="block w-24 px-4 py-2 text-sm text-black hover:bg-red-700 hover:rounded-3xl"
                  >
                    Sign Up
                  </button>
                )}
                {user && (
                  <Menu.Item>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                    >
                      Sign out
                    </button>
                  </Menu.Item>
                )}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      {/* Sliding Sidebar for Mobile */}

       
    
      <div
        className={`fixed top-0 left-0 w-70 h-full bg-gray-800 transform  ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out   sm:hidden z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-2  px-4 pb-3 pt-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-purple-300 bg-gray-700 hover:bg-gray-950 hover:text-white w-[40vw]",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {item.name}
            </a>
          ))}
           <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-green-300 bg-gray-700 hover:bg-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 ">
                    Admin Tools
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-green-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/viewanalytics"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900"
                      >
                        View Analytics
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/addpaymentinfo"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900"
                      >
                        Auto Add Players Payouts
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/linkaccounts"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900"
                      >
                        Link Player Accounts
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
          {!user && (
            <button
              onClick={handleSignup}
              className="block w-[40] px-4 py-2 text-base font-medium text-red-400 border rounded-xl hover:bg-red-700 hover:rounded-2xl hover:text-white"
            >
              Sign Up
            </button>
          )}
          {user && (
            <button
              onClick={handleSignOut}
              className="block w-full px-4 py-2 text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
            >
              Sign Out
            </button>
          )}
        </div>
      </div> 
    
    </Disclosure>
  );
}

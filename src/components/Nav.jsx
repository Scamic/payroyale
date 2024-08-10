import { Disclosure, DisclosureButton, DisclosurePanel, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'AdminWACHAN', href: '/admin', current: false },
  { name: 'Pay Stats',  href: '/war-stats', current: false },
  { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUserDataFromSession = () => {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
        setRoles(parsedData.roles || []);
      } else {
        fetchUserDataFromBackend();
      }
    };

    const fetchUserDataFromBackend = async () => {
      const cookie = Cookies.get('clashroyale-session');
      if (cookie) {
        try {
          const response = await axios.get('http://localhost:8080/api/user/profile', {
            withCredentials: true,
          });
          const userData = response.data;
          setUser(userData);
          setRoles(userData.roles || []);
          sessionStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
          setRoles([]);
          sessionStorage.removeItem('user');
        }
      }
    };

    fetchUserDataFromSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/signout', {}, { withCredentials: true });
      setUser(null);
      setRoles([]);
      Cookies.remove('clashroyale-session');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navigate = useNavigate();

  const handleSignup = () => {
    // Navigate to a new route
    navigate('/signup');
  };

  

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="image.png"
                //  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
              
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-purple-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
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
                      className="text-red-300 hover:bg-red-700 hover:text-white rounded-md ms-7 px-3 py-2 text-sm font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </Menu.Button>
              </div>
              <Menu.Items
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <div className="px-4 py-2">
                  {user && (
                    <span className="block text-sm text-gray-700">
                      Email : {user.email} <br></br>Role : ({roles.join(', ')})
                    </span>
                  )}
                </div>
                {!user && (
                    <button
                    onClick={handleSignup}
                    className="block w-full px-4 py-2 text-sm text-purple-700 hover:bg-purple-100"
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

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-purple-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
          
          {!user && (
            <div className="block rounded-md px-3 py-2 text-base font-medium text-sky-300/20 hover:bg-gray-700 hover:text-white">
              
              <Disclosure.Button
                as="button"
                onClick={handleSignup}
                className="w-full rounded-md px-3 py-2 text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
              >
                Sign Up
              </Disclosure.Button>
            </div>
          )}
          {user && (
            <div className="block rounded-md px-3 py-2 text-base font-medium text-sky-300/20 hover:bg-gray-700 hover:text-white">
              
              <Disclosure.Button
                as="button"
                onClick={handleSignOut}
                className="w-full rounded-md px-3 py-2 text-base font-medium text-red-300 hover:bg-red-700 hover:text-white"
              >
                Sign Out
              </Disclosure.Button>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

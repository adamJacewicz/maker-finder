import Link from 'next/link';
import { signOut } from 'next-auth/react';
import User from '@/public/user.svg';
import useAuth from '@/hooks/use-auth';
import { Menu } from '@headlessui/react';
import { ElementType, HTMLProps } from 'react';

export interface MenuItemProps extends Omit<HTMLProps<HTMLElement>, 'as' | 'ref'> {
  as?: ElementType;
  text: string;
}

const menuItems: MenuItemProps[] = [
  {
    as: Link,
    href: '/profile',
    text: 'Profile',
  },
  {
    as: 'button',
    onClick: async () => await signOut({ callbackUrl: '/' }),
    text: 'Logout',
  },
];

const Navigation = () => {
  const { isAuthenticated, data } = useAuth();

  return (
    <nav className="bg-base-700">
      <div className="p-4 mx-auto container flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold leading-none">
          MakerFinder
        </Link>

        <div>
          <Link className="hover:bg-base-600 rounded-md px-3 py-2 font-medium" href="/">Home</Link>
          <Link className="hover:bg-base-600 rounded-md px-3 py-2 font-medium" href="/profiles/browse">Browse</Link>
        </div>
        {isAuthenticated ? (
          <Menu as="div" className="relative">
            <Menu.Button className="rounded-full hover:bg-base-500 block">
              <div className="border-2 rounded-full overflow-hidden flex justify-center items-center w-10 h-10">
                {data?.user?.image ? <img src={data.user.image} alt="User image" /> : <User />}
              </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-1 w-32 shadow-2xl p-2 border border-base-700 origin-top-right rounded-md overflow-hidden bg-base-600">
              {menuItems.map(({ as, text, ...rest }, index) => (
                <Menu.Item
                  as={as}
                  className="font-medium tracking-wide hover:bg-base-500 rounded-md w-full block px-2 py-1.5 text-left"
                  key={index}
                  {...rest}
                >
                  {text}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        ) : (
          <Link className="hover:bg-base-600 rounded-md px-3 py-2 font-medium" href="/login">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

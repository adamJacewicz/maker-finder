import { default as NextLink, LinkProps } from 'next/link';
import { signOut } from 'next-auth/react';
import useAuth from '@/hooks/use-auth';
import { Menu } from '@headlessui/react';
import React, { ElementType, FC, HTMLProps, PropsWithChildren } from 'react';
import UserAvatar from '@/components/UserAvatar';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export interface MenuItemProps extends Omit<HTMLProps<HTMLElement>, 'as' | 'ref'> {
  as?: ElementType;
  text: string;
}

export const Link: FC<
  LinkProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    PropsWithChildren
> = ({ children, className, href }) => {
  const router = useRouter();
  const hrefValue = (typeof href === 'string' ? href : href.href) ?? '';
  const isActive =
    hrefValue == '/' ? router.asPath === hrefValue : router.asPath.startsWith(hrefValue);
  return (
    <NextLink
      href={hrefValue}
      className={clsx(className, 'rounded-md px-3 py-2 font-medium', {
        'bg-theme-accent': isActive,
      })}
    >
      {children}
    </NextLink>
  );
};

const menuItems: MenuItemProps[] = [
  {
    as: NextLink,
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
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="bg-base-700">
      <div className="p-4 mx-auto container flex justify-between items-center">
        <NextLink href="/" className="text-2xl font-bold leading-none">
          MakerFinder
        </NextLink>

        {isAuthenticated && (
          <div>
            <Link href="/">Home</Link>
            <Link href="/browse">Browse</Link>
            <Link href="/conversations">Conversations</Link>
            <Link href="/profile">Profile</Link>
          </div>
        )}
        {isAuthenticated ? (
          <Menu as="div" className="relative">
            <Menu.Button className="rounded-full hover:bg-base-500 block">
              <UserAvatar user={user} />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-32 shadow-2xl p-2 border border-base-700 origin-top-right rounded-md overflow-hidden bg-base-600">
              {menuItems.map(({ as, text, ...rest }, index) => (
                <Menu.Item
                  as={as}
                  className="font-medium tracking-wide hover:bg-theme-accent rounded-md w-full block px-2 py-1.5 text-left"
                  key={index}
                  {...rest}
                >
                  {text}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

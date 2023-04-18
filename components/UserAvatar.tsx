import React, { FC, HTMLAttributes } from 'react';
import UserIcon from '@/public/user.svg';
import clsx from 'clsx';
import {User} from "next-auth";

type UserAvatarProps = {
  user?: User | null;
} & HTMLAttributes<HTMLDivElement>;

const statusIndicator =
  "after:content-[''] after:block after:absolute after:w-3 after:h-3 after:rounded-full after:border after:border-white after:right-0 after:bottom-0 after:bg-theme-success";

const UserAvatar: FC<UserAvatarProps> = ({ user, className }) => {
  if (!user) return null;
  return (
    <div
      className={clsx(
        'flex justify-center items-center relative w-12 h-12',
        className,
        statusIndicator,
      )}
    >
      {user.image ? (
        <img src={user.image} className="rounded-full " alt="User avatar image" />
      ) : (
        <UserIcon />
      )}
    </div>
  );
};

export default UserAvatar;

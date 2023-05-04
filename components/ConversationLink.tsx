import React, { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Conversation } from '@/types/model';
import { useRouter } from 'next/router';
import UserAvatar from '@/components/UserAvatar';
import { toHour } from '@/utils/helpers';
import {User} from "next-auth";
import useAuth from "@/hooks/use-auth";

const ConversationLink: FC<{ conversation: Conversation }> = ({ conversation }) => {
  const router = useRouter();
  const {data} = useAuth();
  const isSelected = Number(router.query.id) === conversation.id;
  const lastMessage = conversation.messages[0];
  const receiver = conversation.users.find(({ user }) => user.id !== data?.user?.id)?.user as User;

  return (
    <Link
      key={conversation.id}
      href={{ pathname: '/connections', query: { ...router.query,id: conversation.id } }}
      className={clsx(
        isSelected ? 'bg-theme-accent-dark' : 'bg-base-500',
        'rounded-md shadow cursor-pointer relative flex px-4 py-3 mt-4',
      )}
    >
      <div className="mr-1">
        <UserAvatar className="w-12 h-12" user={receiver} />
      </div>
      <div className="ml-2 flex flex-col overflow-hidden flex-grow">
        <h3 className="font-medium text-white">{receiver.name}</h3>
        <div className="text-opacity-80 w-4/5 truncate mt-0.5 text-white">
          {lastMessage?.content}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="whitespace-nowrap text-opacity-80 text-xs text-white">
          {toHour(lastMessage?.createdAt)}
        </div>
      </div>
      <div className="bg-theme-1 flex items-center justify-center absolute top-0 right-0 text-xs rounded-full font-medium mr-4"></div>
    </Link>
  );
};

export default ConversationLink;

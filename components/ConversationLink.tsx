import React, { FC, MouseEventHandler } from 'react';
import clsx from 'clsx';
import { Link } from '@/components/Navigation';
import { Conversation } from '@/types/model';
import UserAvatar from '@/components/UserAvatar';
import { toHour } from '@/utils/helpers';
import { User } from 'next-auth';
import useAuth from '@/hooks/use-auth';
import { useRouter } from 'next/router';

const ConversationLink: FC<{
  conversation: Conversation;
}> = ({ conversation }) => {
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const lastMessage = conversation.messages[0];
  const receiver = conversation.users.find(({ user }) => user.id !== currentUser?.id)?.user as User;
  return (
    <Link
      key={conversation.id}
      href={`/conversations/${conversation.id}`}
      className={clsx(
        'rounded-md shadow cursor-pointer relative flex px-4 py-3 mt-4 bg-base-500 first-of-type:mt-0',
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

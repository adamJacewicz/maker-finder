import React, { FC, KeyboardEventHandler, useRef } from 'react';
import { Conversation as ConversationType, ConversationMessage, CurrentUser } from '@/types/model';
import useSWR, { Fetcher, mutate } from 'swr';
import restClient from '@/rest-client';
import SendIcon from '@/public/send.svg';
import UserAvatar from '@/components/UserAvatar';
import { User } from 'next-auth';
import { toHour } from '@/utils/helpers';
import clsx from 'clsx';

const Message: FC<{ message: ConversationMessage; isMine: boolean }> = ({ message, isMine }) => (
  <div
    className={clsx(
      'flex items-end mb-4 max-w-[60%]',
      isMine ? 'ml-auto justify-end' : 'mr-auto justify-start',
    )}
  >
    <div
      className={clsx(
        'w-10 h-10 hidden sm:block flex-none relative mr-4 mb-5',
        isMine ? 'order-1 ml-4' : 'mr-4',
      )}
    >
      <img alt={message.user.name} className="rounded-full" src={message.user.image!} />
    </div>
    <div>
      <div
        className={clsx(
          'bg-base-500 rounded-md leading-relaxed dark:text-gray-300 text-gray-700 px-4 py-3',
          { 'bg-theme-accent': isMine },
        )}
      >
        {message.content}
      </div>
      <div className="text-gray-600 text-xs mt-1">{toHour(message.createdAt)}</div>
    </div>
  </div>
);

const MessageForm: FC<{ conversationId: number }> = ({ conversationId }) => {
  const msgRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!msgRef.current) return;
    await restClient.conversations.message.create(conversationId, {
      content: msgRef.current.value,
    });
    msgRef.current.value = '';
    mutate(`/api/conversations/${conversationId}`);
  };

  const handleKey: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit();
    }
  };

  return (
    <div className="dark:bg-dark-2 bg-base-700 flex items-center p-3 gap-3 shadow rounded-lg">
      <input
        onKeyDown={handleKey}
        ref={msgRef}
        placeholder="Type your message here..."
        name="message"
        className="w-full block outline-none p-4 rounded-md bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-theme-accent focus:border-theme-accent sm:text-sm"
        autoFocus
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-400 rounded-full block p-3 uppercase tracking-wider "
      >
        <SendIcon className="mb-[-3px] ml-[-2px]" />
      </button>
    </div>
  );
};

const Conversation: FC<{
  initConversation?: ConversationType;
  currentUser: CurrentUser;
}> = ({ initConversation, currentUser }) => {
  const { data: conversation } = useSWR(
    initConversation ? `/api/conversations/${initConversation.id}` : null,
    restClient.fetcher as Fetcher<ConversationType | undefined, string>,
    {
      fallbackData: initConversation,
    },
  );

  if (!conversation) return <h5>NO DATA</h5>;
  const receiver = conversation.users.find(({ user }) => user.id !== currentUser.id)?.user as User;
  return (
    <div className="col-span-12 xl:col-span-9 flex flex-col overflow-hidden  p-6">
      <div className="bg-base-700 flex items-center px-5 py-4 rounded-md">
        <div className="image-fit mr-1">
          <UserAvatar user={receiver} />
          <div className="bg-green-500 w-3 h-3 absolute right-0 bottom-0 rounded-full border border-white"></div>
        </div>
        <div className="ml-2 overflow-hidden">
          <a href="#" className="text-base font-medium">
            {receiver.name}
          </a>
          <div className="text-gray-600">Online</div>
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-hidden flex-1 max-h-full rounded-xl p-2">
        {conversation.messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isMine={message.user.id === currentUser?.id}
          />
        ))}
      </div>
      <MessageForm conversationId={conversation.id} />
    </div>
  );
};

export default Conversation;

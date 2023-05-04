import React, { FC, PropsWithChildren } from 'react';
import { ConversationMessageExtended } from '@/types/model';
import { toDate, toHour } from '@/utils/helpers';
import clsx from 'clsx';

const DateDivider: FC<PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-max text-gray-500 text-xs my-8 relative after:block after:content-[''] after:absolute after:h-[1px] after:top-[50%] after:left-[-160%] after:w-[100px] after:bg-gray-500 before:block before:content-[''] before:absolute before:h-[1px] before:top-[50%] before:right-[-160%] before:w-[100px] before:bg-gray-500">
    {children}
  </div>
);

const Message: FC<{ message: ConversationMessageExtended }> = ({ message }) => (
  <>
    {message.renderDate && <DateDivider>{toDate(message.createdAt)}</DateDivider>}
    <div
      className={clsx(
        'flex items-end mb-4 max-w-[60%]',
        message.isMine ? 'ml-auto justify-end' : 'mr-auto justify-start',
      )}
    >
      <div
        className={clsx(
          'w-10 h-10 hidden sm:block flex-none relative mb-5',
          message.isMine ? 'order-1 ml-4' : 'mr-4',
        )}
      >
        <img alt={message.user.name} className="rounded-full" src={message.user.image!} />
      </div>
      <div className="break-all">
        <div
          className={clsx(
            'bg-base-500 rounded-md leading-relaxed dark:text-gray-300 text-gray-700 px-4 py-3',
            { 'bg-theme-accent': message.isMine },
          )}
        >
          {message.content}
        </div>
        <div className="text-gray-500 text-xs mt-1">{toHour(message.createdAt)}</div>
      </div>
    </div>
  </>
);

export default Message;

import React, { FC, KeyboardEventHandler, useRef } from 'react';
import { getSession } from 'next-auth/react';
import { Conversation, CurrentUser, ConversationMessage } from '@/types/model';
import { getConversation } from '@/services/conversation.service';
import Layout from '@/components/Layout';
import useSWR, { mutate } from 'swr';
import restClient from '@/rest-client';
import User from '@/public/user.svg';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
  const conversation = await getConversation(params?.id as string, session.user.id);
  if (!conversation) {
    return {
      notFound: true,
    };
  }
  return {
    props: { initConversation: conversation, currentUser: session.user },
  };
};
const MyMessage: FC<{ message: ConversationMessage }> = ({ message }) => (
  <div className="flex justify-end mb-4">
    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
      {message.content}
    </div>
    {message.user.image ? (
      <img src={message.user.image} className="object-cover h-8 w-8 rounded-full" alt="" />
    ) : (
      <User />
    )}
  </div>
);

const Message: FC<{ message: ConversationMessage }> = ({ message }) => (
  <div className="flex justify-start mb-4">
    {message.user.image ? (
      <img src={message.user.image} className="object-cover h-8 w-8 rounded-full" alt="" />
    ) : (
      <User />
    )}
    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
      {message.content}
    </div>
  </div>
);

const MessageForm: FC<{ conversationId: string }> = ({ conversationId }) => {
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
    <form className="py-5">
      <input
        onKeyDown={handleKey}
        ref={msgRef}
        className="w-full bg-gray-300 py-5 px-3 rounded-xl"
        type="text"
        placeholder="type your message here..."
      />
    </form>
  );
};

const ConversationPage: FC<{
  initConversation: Conversation;
  currentUser: CurrentUser;
}> = ({ initConversation, currentUser }) => {
  const {
    data: { conversation },
  } = useSWR(`/api/conversations/${initConversation.id}`, restClient.fetcher, {
    fallbackData: { conversation: initConversation },
  });
  return (
    <Layout>
      <div className="w-full px-5 flex flex-col justify-between bg-gree">
        <div className="flex flex-col mt-5">
          {conversation.messages.map((message) =>
            message.user.id === currentUser.id ? (
              <MyMessage key={message.id} message={message} />
            ) : (
              <Message key={message.id} message={message} />
            ),
          )}
        </div>
        <MessageForm conversationId={conversation.id} />
      </div>
    </Layout>
  );
};

export default ConversationPage;

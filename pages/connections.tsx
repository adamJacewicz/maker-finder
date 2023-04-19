import React, { FC, KeyboardEventHandler, useRef, useState } from 'react';
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getAllConversations } from '@/services/conversation.service';
import { Conversation as ConversationType, CurrentUser } from '@/types/model';
import Conversation from '@/components/Conversation';
import SearchIcon from '@/public/search.svg';
import Input from '@/components/Input';
import ConversationLink from '@/components/ConversationLink';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import restClient from '@/rest-client';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const queryId = query.id;
  const conversations = await getAllConversations(user.id, query.searchTerm);
  const conversation = conversations.find((el) => el.id === Number(queryId));
  return {
    props: {
      currentUser: user,
      conversations,
      conversation,
    },
  };
};

const Connections: FC<{
  conversations: ConversationType[];
  conversation: ConversationType;
  currentUser: CurrentUser;
}> = ({ conversations, conversation, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const handleKey: KeyboardEventHandler = (e) => {
    if (!searchRef.current) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      setSearchTerm(searchRef.current.value);
    }
  };

  const { data, mutate } = useSWR(
    `/api/conversations?searchTerm=${searchTerm}`,
    restClient.fetcher as Fetcher<ConversationType[], string>,
    { fallbackData: conversations, keepPreviousData: true },
  );

  return (
    <Layout>
      <section className="flex-1 sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
        <div className="side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden">
          <h3 className="text-xl font-medium">Chats</h3>
          <Input
            ref={searchRef}
            defaultValue={router.query.searchTerm}
            onKeyDown={handleKey}
            icon={SearchIcon}
            placeholder="Search for messages or users..."
          />
          <div className="overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-5">
            {data?.map((conversation) => (
              <ConversationLink key={conversation.id} conversation={conversation} />
            ))}
          </div>
        </div>
        <Conversation currentUser={currentUser} initConversation={conversation} />
      </section>
    </Layout>
  );
};

export default Connections;

import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getAllConversations, getConversation } from '@/services/conversation.service';
import { Conversation as ConversationType, CurrentUser } from '@/types/model';
import Conversation from '@/components/Conversation';
import ConversationList from '@/components/ConversationList';
import useSWR, { Fetcher } from 'swr';
import restClient from '@/rest-client';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);
  const currentUser = session?.user as CurrentUser;

  const queryId = Number(query.id);
  const conversation = await getConversation(queryId, currentUser.id);
  if (!conversation) {
    return {
      redirect: {
        destination: '/conversations',
        permanent: false,
      },
    };
  }

  const conversations = await getAllConversations(currentUser.id, query.searchTerm);

  return {
    props: {
      currentUser,
      conversations,
      conversation,
    },
  };
};

const Conversations: FC<{
  conversations: ConversationType[];
  conversation: ConversationType;
  currentUser: CurrentUser;
}> = ({ conversations, conversation, currentUser }) => {
  const { data } = useSWR(
    conversation.id ? `/api/conversations/${conversation.id}` : null,
    restClient.fetcher as Fetcher<ConversationType | undefined, string>,
    {
      fallbackData: conversation,
    },
  );

  return (
    <section className="flex-1 sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
      <ConversationList initialData={conversations} />
      {data ? (
        <Conversation currentUser={currentUser} conversation={data} />
      ) : (
        <h3>Something went wrong</h3>
      )}
    </section>
  );
};

export default Conversations;

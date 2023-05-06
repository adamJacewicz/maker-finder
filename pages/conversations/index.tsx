import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getAllConversations } from '@/services/conversation.service';
import { CurrentUser } from '@/types/model';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as CurrentUser;

  const conversations = await getAllConversations(user.id, query.searchTerm);
  if (conversations.length) {
    return {
      redirect: {
        destination: `/conversations/${conversations[0].id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Conversations: FC = () => {
  return (
    <h3 className="mx-auto my-[20%] text-3xl font-semibold">You don't have any matches.</h3>
  );
};

export default Conversations;

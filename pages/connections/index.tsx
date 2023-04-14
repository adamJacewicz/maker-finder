import React, { FC } from 'react';
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import User from '@/public/user.svg';
import { getAllConversations } from '@/services/conversation.service';
import Link from 'next/link';
import { Conversation, User as UserType } from '@/types/model';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const conversations = await getAllConversations({
    searchTerm: '',
    userId: session.user.id,
  });

  return {
    props: {
      conversations: conversations.map((conversation) => ({
        ...conversation,
        receiver: conversation.users[0].user,
      })),
    },
  };
};

const Index: FC<{ conversations: (Conversation & { receiver: UserType })[] }> = ({
  conversations,
}) => {
  return (
    <Layout>
      <div className="flex justify-center">
        <ul className="min-w-[400px]">
          {conversations.map((conversation) => (
            <li key={conversation.id} className="mb-2 border-gray-400">
              <Link
                href={`/connections/${conversation.id}`}
                className="border cursor-pointer bg-white dark:bg-gray-800 rounded-md p-4 flex gap-4"
              >
                <div className="min-w-[64px] max-w-[64px]">
                  {conversation.receiver.image ? (
                    <img
                      alt="profil"
                      src={conversation.receiver.image}
                      className="block rounded-full"
                    />
                  ) : (
                    <User />
                  )}
                </div>
                <div className="flex-col flex dark:text-white">
                  <h3 className="font-medium mb-3  text-lg leading-5">
                    {conversation.receiver.name}
                  </h3>

                  <p className="text-sm tracking-wide">{conversation.receiver.skill}</p>
                </div>
                <div className="ml-auto text-xs dark:text-gray-300">4d ago</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Index;

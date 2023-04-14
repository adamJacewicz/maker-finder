import React, { FC } from 'react';
import Layout from '@/components/Layout';
import {GetServerSideProps} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

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

  return {
    props: {},
  };
};

const Profile: FC = () => {
  return <Layout><h1>asdasd</h1></Layout>;
};

export default Profile;

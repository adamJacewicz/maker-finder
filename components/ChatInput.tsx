import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import restClient from '@/rest-client';
import { mutate } from 'swr';
import Input from '@/components/Input';
import SendIcon from '@/public/send.svg';

type ChatMessage = { content: string };

const ChatInput: FC<{ conversationId: number }> = ({ conversationId }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<ChatMessage>();

  const onSubmit: SubmitHandler<ChatMessage> = async (data) => {
    await restClient.conversations.message.create(conversationId, data);
    await mutate(`/api/conversations/${conversationId}`);
    reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:bg-dark-2 bg-base-700 flex items-center p-3 gap-3 shadow rounded-lg"
      >
        <Input
          error={errors.content?.message}
          {...register('content', { required: true })}
          required
          autoFocus
          placeholder="Your message..."
          autoComplete="off"
          className="w-full"
          wrapperClass="border-transparent bg-transparent"
        />
        <button
          disabled={!isValid}
          type="submit"
          className="bg-blue-400 rounded-md block p-3 uppercase tracking-wider disabled:opacity-60"
        >
          <SendIcon className="mb-[-3px] ml-[-2px]" />
        </button>
      </form>
    </>
  );
};

export default ChatInput;

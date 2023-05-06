import React, { FC, KeyboardEventHandler, useRef, useState } from 'react';
import Input from '@/components/Input';
import SearchIcon from '@/public/search.svg';
import ConversationLink from '@/components/ConversationLink';
import useSWR, { Fetcher } from 'swr';
import restClient from '@/rest-client';
import { Conversation as ConversationType } from '@/types/model';

const ConversationList: FC<{
  initialData?: ConversationType[];
}> = ({ initialData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const handleKey: KeyboardEventHandler = (e) => {
    if (!searchRef.current) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      setSearchTerm(searchRef.current.value);
    }
  };
  const { data } = useSWR(
    `/api/conversations?searchTerm=${searchTerm}`,
    restClient.fetcher as Fetcher<ConversationType[], string>,
    { fallbackData: initialData, keepPreviousData: true },
  );

  return (
    <div className="flex gap-4 col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 flex-col overflow-hidden bg-theme-primary pb-5">
      <h3 className="text-xl font-medium">Chats</h3>
      <Input
        ref={searchRef}
        onKeyDown={handleKey}
        icon={SearchIcon}
        name="search"
        placeholder="Search for messages or users..."
      />
      <div className="overflow-y-auto scrollbar-hidden py-2 -mx-5 px-5">
        {data?.map((conversation) => (
          <ConversationLink key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;

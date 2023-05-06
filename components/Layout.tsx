import { FC, PropsWithChildren } from 'react';
import Navigation from '@/components/Navigation';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex max-h-[calc(100%_-_72px)]">{children}</main>
    </section>
  );
};

export default Layout;

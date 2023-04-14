import { FC, PropsWithChildren } from 'react';
import Navigation from '@/components/Navigation';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section>
      <Navigation />
      <main className="container mx-auto"> {children}</main>
    </section>
  );
};

export default Layout;

import { Layout } from "./_components/Layout";

interface JSBookLayoutProps {
  children: React.ReactNode;
}

export default function JSBookLayout({ children }: JSBookLayoutProps) {
  return <Layout>{children}</Layout>;
}

import Navbar from "@/components/Navbar";
import AuthStatus from "@/AuthStatus";

export const metadata = {
  title: 'Necil Çakmak',
  description: 'Yazılım ve Teknoloji Blogu',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar authStatus={<AuthStatus />} />
      <main className="max-w-5xl mx-auto mt-6 px-4">
        {children}
      </main>
    </>
  );
}
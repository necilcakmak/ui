import Navbar from "@/components/layout/Navbar";
import AuthStatus from "@/AuthStatus";
import ProfileSidebar from "@/components/layout/ProfileSidebar";
import CategorySidebar from "@/components/layout/CategorySidebar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased">
      <Navbar authStatus={<AuthStatus />} />

      <main className="flex-grow max-w-[1600px] mx-auto mt-8 md:mt-12 px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <ProfileSidebar />
          </aside>

          <div className="lg:col-span-6 order-1 lg:order-2">{children}</div>

          <aside className="lg:col-span-3 order-3">
            <CategorySidebar />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

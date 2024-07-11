import Sidebar from "@/components/Sidebar";
import BurgerButton from "@/components/BurgerButton";

export const metadata = {
  title: "Bibliotheque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar links={links} title="Admin" />
        <main className="lg:ml-[300px] p-16 bg-gray-300 relative">
          <BurgerButton />
          {children}
        </main>
      </body>
    </html>
  );
}
const links = [
  {
    title: "Home",
    url: "/admin",
  },
  {
    title: "Courses",
    url: "/admin/courses",
  },
  {
    title: "Users",
    url: "/admin/users",
  },
  {
    title: "themes",
    url: "/admin/themes",
  },
];

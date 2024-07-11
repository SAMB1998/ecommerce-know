import Link from "next/link";
import React from "react";

const Sidebar = ({ links, title }: { links: any; title: string }) => {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-[300px] z-[999]"
      id="sidebar"
    >
      <div className="w-full h-full bg-primary">
        <h1 className="text-3xl font-bold text-center py-8 px-2 text-white">
          {title}
        </h1>
        <div className="flex justify-center flex-col p-4 text-xl">
          {links.map((link: any) => (
            <Link
              key={link.title}
              href={link.url}
              className="text-black font-semibold btn btn-white rounded-full w-full my-2"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

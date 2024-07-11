"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <header className="w-full">
      <nav className="navbar bg-base-100 shadow-md rounded-lg bg-opacity-70">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/courses">Cours</Link>
              </li>
              {session && (
                <>
                  <li>
                    <Link href="/library">Bibliothèque</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Deconnexion</button>
                  </li>
                  {session.user.role === "admin" && (
                    <li>
                      <Link href="/admin">Admin</Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">KNOWLEDGE</a>
        </div>
        <div className="navbar-end">
          {session ? (
            <>
              <Link href={"/cart"} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
            </>
          ) : (
            <Link href="/login" className="btn btn-ghost">
              Connection
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

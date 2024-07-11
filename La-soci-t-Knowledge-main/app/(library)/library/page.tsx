import { getUserOrders } from "@/actions/user.actions";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const data: any = await getUserOrders(session?.user.id);

  return (
    <>
      <Navbar />
      <section className="p-4 min-h-screen bg-blue-100">
        <h1 className="text-center text-3xl text-primary font-bold mb-6">
          Mes cours
        </h1>
        <div className="flex flex-row flex-wrap gap-4 mt-4">
          {data.length > 0 ? (
            data.map((order: any, index: number): any => (
              <div
                key={index}
                className="bg-white shadow-md w-[400px] rounded-lg p-4 flex flex-row flex-wrap"
              >
                <Image
                  src={order.image}
                  alt={order.title}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-40 h-40"
                />
                <div className="flex flex-col gap-2 w-full">
                  <h2 className="text-2xl font-semibold text-center my-2">
                    {order.title}
                  </h2>
                  <div className="flex flex-col justify-center items-left w-full gap-2 h-26">
                    <h3 className="text-xl font-bold">Description:</h3>
                    <p className="text-gray-600">{order.description}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold my-2">
                  Lessons:{" "}
                  <span className="text-gray-600">{order.lessons.length}</span>
                </h3>

                <Link
                  href={`/library/${order.courseId}`}
                  className="mt-4 w-full btn btn-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                </Link>
              </div>
            ))
          ) : (
            <div className="bg-white shadow-md w-[400px] rounded-lg p-4 flex flex-row flex-wrap">
              <h2 className="text-2xl font-semibold text-center my-2">
                Vous n&apos;avez pas de cours, Acheter une?
              </h2>
              <Link
                href="/courses"
                className="mt-4 w-full btn btn-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
              >
                Acheter
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default page;

import { fetchCourses } from "@/actions/admin.actions";
import Main from "@/components/Main";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/Card";

const page = async () => {
  const courses: any = await fetchCourses();

  const shuffledCourses = courses.sort(() => 0.5 - Math.random());

  const randomCourses = shuffledCourses.slice(0, 3);

  return (
    <>
      <Main />
      <section className="bg-blue-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl lg:text-5xl font-bold mb-8 my-4 text-center text-primary">
            Notre platforme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center my-32">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-blue-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">
                Apprentissage interactif
              </h3>
              <p className="text-gray-600 text-center">
                Profitez d&apos;une expérience d&apos;apprentissage enrichie
                avec des vidéos, des quiz et des exercices pratiques.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-green-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">
                Validation du cours
              </h3>
              <p className="text-gray-600 text-center">
                Suivez votre progression et validez vos connaissances avec des
                tests et des certificats.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-yellow-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">...et bien plus</h3>
              <p className="text-gray-600 text-center">
                Découvrez d&apos;autres fonctionnalités qui vous aideront à
                maîtriser vos compétences et à atteindre vos objectifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24  overflow-x-hidden relative bg-[hsl(258,35%,10%)]">
        <h2 className="text-2xl lg:text-5xl font-bold mb-16 mt-4 text-center  text-white">
          Nos recommandations
        </h2>

        <div className="flex flex-row flex-wrap gap-6 items-center justify-center mx-10">
          {randomCourses.map((course: any) => (
            <Card
              key={course._id}
              title={course.title}
              image={course.image}
              description={course.description}
              price={course.price}
              theme={course.theme}
              _id={course._id}
            />
          ))}
        </div>
      </section>
      <section className="bg-blue-100 flex justify-center items-center p-28">
        <div className="bg-blue-500 py-16 px-10 rounded-lg shadow-md text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Bienvenue chez Knowledge
          </h3>
          <p className="text-lg text-white mb-6">
            Devenez membre de notre communaute et profitez de nos services.
          </p>
          <Link
            href="/courses"
            className="bg-white hover:bg-blue-600 hover:text-white text-blue-500 font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Nos cours
          </Link>
        </div>
      </section>
      <footer className="bg-gray-800 text-white p-4 py-8">
        <p className="text-center">© 2023 Knowledge. All rights reserved.</p>
      </footer>
    </>
  );
};

export default page;

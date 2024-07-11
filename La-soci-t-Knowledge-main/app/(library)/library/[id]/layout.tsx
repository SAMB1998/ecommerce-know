import { fetchLessonsByCourseId } from "@/actions/general.actions";
import BurgerButton from "@/components/BurgerButton";
import Link from "next/link";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const lessons = await fetchLessonsByCourseId(params.id);
  return (
    <>
      <aside
        className="fixed top-0 left-0 h-screen w-[300px] bg-primary py-4 z-[999]"
        id="sidebar"
      >
        <h2 className="text-2xl font-bold p-6 mt-4 text-white">Les leçons</h2>

        {lessons.map((lesson: any) => (
          <div key={lesson._id} className="p-4 flex flex-col  ">
            <Link
              href={`/library/${lesson.courseId}/${lesson._id}`}
              key={lesson._id}
              className="text-black font-semibold btn btn-white rounded-full w-full"
            >
              {lesson.title}
            </Link>
          </div>
        ))}
        <Link
          href={"/library"}
          className="btn btn-error mt-4 w-3/4 absolute bottom-4 left-1/2 -translate-x-1/2 text-white"
        >
          Retour
        </Link>
      </aside>
      <main className="lg:ml-[300px] lg:p-16 p-4 bg-blue-100 lg:py-16 py-22">
        <BurgerButton />
        {children}
      </main>
    </>
  );
};

export default layout;

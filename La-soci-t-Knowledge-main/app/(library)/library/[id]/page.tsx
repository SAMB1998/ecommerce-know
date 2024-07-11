import { fetchLessonsByCourseId } from "@/actions/general.actions";
import Link from "next/link";
const page = async ({ params }: { params: { id: string } }) => {
  const data = await fetchLessonsByCourseId(params.id);
  return (
    <section className="p-4 min-h-screen">
      <div className="flex lg:flex-row flex-col justify-center items-center h-full lg:h-[70vh] gap-10">
        {data.map((lesson: any) => (
          <div
            key={lesson._id}
            className="rounded-lg shadow-md p-8 bg-white object-cover flex flex-col justify-center items-center w-[350px] h-[250px] px-8"
          >
            <h1 className="text-3xl font-bold text-center">{lesson.title}</h1>
            <p className="text-lg text-center"> {lesson.description}</p>
            <Link
              href={`/library/${lesson.courseId}/${lesson._id}`}
              className="btn btn-primary mt-4 w-full"
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
        ))}
      </div>
    </section>
  );
};

export default page;

import {
  getUserOrders,
  getValidatedLessons,
  validateLesson,
} from "@/actions/user.actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
const page = async ({
  params,
}: {
  params: { id: string; lessonId: string };
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const data = await getUserOrders(userId);
  const validatedLessons = await getValidatedLessons(userId);
  console.log(validatedLessons);
  let isValidated = false;
  if (validatedLessons) {
    isValidated = validatedLessons.some((lesson: { lessonId: any }) =>
      lesson.lessonId.includes(params.lessonId)
    );
  }

  // Find the course that contains the lesson with the given lessonId
  const course = data.find((course: { lessons: any[] }) =>
    course.lessons.some(
      (lesson: { _id: string }) => lesson._id === params.lessonId
    )
  );

  if (!course) {
    return <div>Course not found</div>;
  } else {
    // Once the course is found, find the specific lesson within it
    const lesson = course.lessons.find(
      (lesson: { _id: string }) => lesson._id === params.lessonId
    );

    if (!lesson) {
      return (
        <div className="p-8 min-h-screen bg-gray-100">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center text-blue-600 my-4">
              Oops, Vous n&apos; avez pas encore acheter ce cours
            </h1>
            <Link href={`/courses/${course._id}`} className="btn btn-primary">
              {" "}
              Acheter le cours
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <section className="p-4 sm:p-8 md:p-12 min-h-screen bg-gray-100">
          <div className="flex flex-col justify-center">
            <video controls className="w-full h-[400px]" autoPlay loop>
              <source src={lesson.video} type="video/mp4" />
            </video>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-blue-600 my-4">
              {lesson.title}
            </h1>
            <h2 className="text-center text-sm sm:text-base md:text-lg">
              {lesson.description}
            </h2>
            <h3 className="text-left text-lg font-bold  sm:text-base my-2">
              Fiche du leçon:
            </h3>
            <p className="text-left text-sm sm:text-base md:text-lg my-2">
              {lesson.content}
            </p>

            {isValidated ? (
              <div className="btn btn-primary">Vous avez validez ce cours</div>
            ) : (
              <form action={validateLesson} className="w-full my-4">
                <input
                  type="hidden"
                  name="lessonId"
                  value={lesson._id}
                  hidden
                  readOnly
                />
                <input
                  type="hidden"
                  name="courseId"
                  value={course.courseId}
                  hidden
                  readOnly
                />
                <input
                  type="hidden"
                  name="userId"
                  value={userId}
                  hidden
                  readOnly
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-outline w-full"
                >
                  Valider ce cours
                </button>
              </form>
            )}
          </div>
        </section>
      );
    }
  }
};

export default page;

import {
  deleteLesson,
  fetchCourses,
  fetchLessonsByCourseId,
} from "@/actions/admin.actions";
import Link from "next/link";

const page = async ({ params }: any) => {
  const courses = await fetchCourses();
  const lessons = await fetchLessonsByCourseId(params.id);
  const course = courses.find((course: any) => course._id === params.id);

  return (
    <section className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-3xl font-bold text-center">{course.title}</h1>
        <p className="text-center text-gray-700">{course.description}</p>
        <Link
          href={`/admin/courses/add-or-edit/?courseId=${params.id}&action=add`}
          className="btn btn-primary mt-4"
        >
          Ajouter un leçon
        </Link>
      </div>

      {lessons.map((lesson: any) => (
        <div
          key={lesson._id}
          className="mb-8 shadow-md rounded-lg p-4 bg-white"
        >
          <div className="flex justify-between items-center my-2">
            <h2 className="text-2xl font-bold">Le titre:</h2>
            <span className="font-bold text-xl">{lesson.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Le prix:</h2>
            <span className="font-bold text-xl">{lesson.price}€</span>
          </div>
          <h3 className="text-2xl font-bold mt-4">Le contenu du leçon:</h3>
          <p className="text-gray-700 mt-2">{lesson.content}</p>
          <div className="flex flex-col justif-center items-center my-4 gap-2">
            {lesson.video && (
              <Link
                href={lesson.video}
                target="_blank"
                className="btn btn-outline w-full"
              >
                Video
              </Link>
            )}
            <Link
              href={`/admin/courses/add-or-edit/?courseId=${params.id}&action=edit&lessonId=${lesson._id}`}
              className="btn btn-outline w-full"
            >
              Edit
            </Link>
            <form action={deleteLesson} className="w-full">
              <input
                type="hidden"
                name="lessonId"
                value={lesson._id}
                readOnly
              />
              <button
                type="submit"
                className="btn btn-outline btn-error w-full"
              >
                Supprimer
              </button>
            </form>
          </div>
        </div>
      ))}
    </section>
  );
};

export default page;

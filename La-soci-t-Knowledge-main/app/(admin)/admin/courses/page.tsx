"use server";
import {
  createCourse,
  deleteCourse,
  editCourse,
  fetchCourses,
  fetchThemes,
} from "@/actions/admin.actions";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Link from "next/link";
const page = async () => {
  const courses = await fetchCourses();
  const themes = await fetchThemes();
  const themeNames = themes.map((theme: any) => theme.name);
  return (
    <section className="p-4 min-h-screen">
      <h1 className="text-3xl text-center font-bold mb-2">Nos Cours</h1>
      <Button title="Create Course" modalToOpen="create-modal" />
      <Modal
        title="Create Course"
        inputs={["title", "description", "price", "image"]}
        themes={themeNames}
        modalId="create-modal"
        action={createCourse}
        modalToClose="create-modal"
      />
      <div className="Links flex flex-row flex-wrap justify-center items-center gap-4 p-4">
        {courses.map((course: any) => (
          <div
            key={course._id}
            className="card p-4 shadow-md rounded bg-white w-[300px]"
          >
            <h2 className="font-bold text-center m-2 text-lg">
              {course.title}
            </h2>
            <p className="text-center">{course.description}</p>
            <div className="flex flex-row justify-between my-1">
              <p className="font-bold">Price:</p>
              <p>{course.price}€</p>
            </div>
            <div className="flex flex-row justify-between my-1">
              <p className="font-bold">Theme:</p>
              <p>{course.theme}</p>
            </div>
            <Link
              className="btn my-4 btn-primary w-full "
              href={`/admin/courses/${course._id}`}
            >
              Les leçons de cours
            </Link>
            <Button
              title="Edit Course"
              modalToOpen="edit-modal"
              styles="w-full btn btn-primary"
            />
            <Modal
              title="Edit Course"
              inputs={["title", "description", "price", "image"]}
              themes={themeNames}
              courseId={course._id.toString()}
              modalId="edit-modal"
              modalToClose="edit-modal"
              action={editCourse}
            />
            <form action={deleteCourse}>
              <input
                type="text"
                name="courseId"
                value={course._id}
                readOnly
                hidden
              />
              <button
                className="btn text-white my-4 bg-red-500 w-full hover:bg-red-600"
                type="submit"
              >
                Supprimer le cours
              </button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;

import React from "react";
import fetchCourseById, {
  fetchLessonsByCourseId,
} from "@/actions/general.actions";
import AddToCard from "@/components/AddToCard";
import Image from "next/image";

const page = async ({ params }: { params: { id: string } }) => {
  const course = await fetchCourseById(params.id);
  const courseLessons = await fetchLessonsByCourseId(params.id);

  return (
    <section className="p-4 min-h-screen bg-blue-100">
      <div className="flex lg:flex-row flex-col justify-center items-center h-full lg:h-[100vh]">
        {" "}
        {/* Improved layout */}
        <Image src={course.image} alt={course.title} width={500} height={500} />
        <div className="flex flex-col justify-center items-left bg-white rounded-r-lg h-[100%] px-10">
          <div className="mb-4">
            {" "}
            <h1 className="text-3xl font-bold">{course.title}</h1>
          </div>
          <p className="text-lg mb-4">{course.description}</p>{" "}
          <AddToCard course={course} lessons={courseLessons} />
        </div>
      </div>
    </section>
  );
};

export default page;

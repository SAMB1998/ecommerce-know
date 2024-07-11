import Lesson from "@/models/Lesson";
import Course from "@/models/Course";

import { connectToDB } from "@/utils/database";
import User from "@/models/User";

export async function fetchLessons() {
  await connectToDB();
  try {
    const lessons = await Lesson.find();
    return JSON.parse(JSON.stringify(lessons));
  } catch (error) {
    throw new Error("Error fetching lessons: " + error);
  }
}

export default async function findCourseById(courseId: string) {
  // Establishing connection to database

  await connectToDB();
  try {
    const course = await Course.findById(courseId);
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    throw new Error("Course not found");
  }
}

export async function fetchLessonsByCourseId(courseId: string) {
  // Establishing connection to database
  await connectToDB();

  try {
    const lessons = await Lesson.find({ courseId: courseId });
    return JSON.parse(JSON.stringify(lessons));
  } catch (error) {
    throw new Error("Error fetching lessons for course: " + error);
  }
}
export async function fetchUserCart(userId: string) {
  // Establishing connection to database
  await connectToDB();
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.cart;
  } catch (error) {
    throw new Error("Error fetching user cart: " + error);
  }
}

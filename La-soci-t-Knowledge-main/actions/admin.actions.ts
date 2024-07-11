"use server";
import { authOptions } from "@/lib/auth";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Theme from "@/models/Theme";
import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
export async function createCourse(formData: FormData) {
  // Getting form entries for the course data
  const data = Object.fromEntries(formData);
  const session = await getServerSession(authOptions);
  // Connection to database
  await connectToDB();
  // Saving new course
  try {
    if (session?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const newCourse = new Course(data);
    await newCourse.save();
    revalidatePath("/admin/courses");
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function fetchCourses() {
  // Establishing connection to database
  await connectToDB();
  try {
    const courses = await Course.find({});
    const coursesArray = JSON.parse(JSON.stringify(courses));
    return coursesArray;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createLesson(formData: FormData) {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  await connectToDB();
  console.log(data);
  try {
    const newLesson = new Lesson(data);
    await newLesson.save();
    revalidatePath(`/admin/courses/${data.courseId}`);
    return JSON.parse(JSON.stringify(newLesson));
  } catch (error) {
    console.error("Error creating lesson:", error);
    // Handle error, e.g., return error message
    throw new Error("Failed to create lesson");
  }
}

export async function editCourse(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  // Connection to database
  await connectToDB();
  // Getting form entries
  const { title, description, price, theme, courseId, image } =
    Object.fromEntries(formData);
  // Finding the course
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  try {
    // Saving the edited course
    course.title = title;
    course.description = description;
    course.price = price;
    course.theme = theme;
    course.image = image;
    await course.save();
    revalidatePath("/admin/courses");
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCourse(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  // Connection to database
  await connectToDB();
  const { courseId } = Object.fromEntries(formData);
  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    revalidatePath("/admin/courses");
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLessonsByCourseId(courseId: any) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  // Establishing connection to database
  await connectToDB();
  // Fetching lessons
  try {
    const lessons = await Lesson.find({ courseId: courseId });
    const lessonsArray = JSON.parse(JSON.stringify(lessons));
    return lessonsArray;
  } catch (error) {
    console.log(error);
  }
}
export async function editLesson(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  // Connection to database
  await connectToDB();
  // Getting form entries
  const { title, content, description, price, video, lessonId } =
    Object.fromEntries(formData);
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    throw new Error("Lesson not found");
  }
  try {
    // Saving the edited lesson
    lesson.title = title;
    lesson.content = content;
    lesson.description = description;
    lesson.video = video;
    lesson.price = price;
    await lesson.save();
    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    console.log(error);
  }
}
export async function fetchUsers() {
  // Establishing connection to database
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  await connectToDB();
  try {
    const users = await User.find({});
    const usersArray = JSON.parse(JSON.stringify(users));
    return usersArray;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteLesson(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  // Connection to database
  await connectToDB();
  const { lessonId } = Object.fromEntries(formData);
  try {
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    revalidatePath(`/admin/courses/${lesson.courseId}`);
    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    console.log(error);
  }
}
export async function createTheme(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  // Connection to database
  await connectToDB();
  // Getting form entries
  const data = Object.fromEntries(formData);
  try {
    const newTheme = new Theme(data);
    await newTheme.save();
    revalidatePath("/admin/themes");
    return JSON.parse(JSON.stringify(newTheme));
  } catch (error) {
    console.log(error);
  }
}
export async function deleteTheme(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  // Connection to database
  await connectToDB();
  const { themeId } = Object.fromEntries(formData);
  try {
    const theme = await Theme.findByIdAndDelete(themeId);
    if (!theme) {
      throw new Error("Theme not found");
    }
    revalidatePath("/admin/themes");
    return JSON.parse(JSON.stringify(theme));
  } catch (error) {
    console.log(error);
  }
}
export async function fetchThemes() {
  // Establishing connection to database
  await connectToDB();
  try {
    const themes = await Theme.find({});
    const themesArray = JSON.parse(JSON.stringify(themes));
    return themesArray;
  } catch (error) {
    console.log(error);
  }
}

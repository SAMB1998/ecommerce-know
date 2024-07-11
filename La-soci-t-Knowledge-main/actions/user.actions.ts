"use server";
import { connectToDB } from "@/utils/database";
import { paymentsApi } from "@/utils/square";
import { randomUUID } from "crypto";
import User from "@/models/User";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";
export async function addToCart(
  courseId: string,
  selectedIds: string[],
  userId: string
) {
  // Connect to the database
  await connectToDB();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (!userId) {
    throw new Error("User ID not provided");
  }
  try {
    // Check for duplicates (consider course ID instead of lesson ID)
    const existingCourseIds = user.cart.map((item: any) =>
      item.courseId.toString()
    );
    const newItems = selectedIds.filter(
      (id) => !existingCourseIds.includes(id)
    );

    // Add new course IDs to the user's cart
    await user.cart.push({
      courseId: courseId,
      lessonId: [...newItems],
    });

    // Save the updated user object with the modified cart
    await user.save();

    return { message: "Items added to cart successfully" }; // Indicate success
  } catch (error) {
    console.error(error);
    return { message: "Error adding items to cart", error }; // Return error details
  }
}

export async function removeFromCart(formData: FormData) {
  const { lessonId, userId } = Object.fromEntries(formData);
  await connectToDB();
  if (!lessonId || !userId) {
    throw new Error("Missing required fields");
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const cart = user.cart;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item.lessonId.includes(lessonId)) {
        const index = item.lessonId.indexOf(lessonId);
        if (index !== -1) {
          item.lessonId.splice(index, 1);
          // Check if the lessonId array is now empty
          if (item.lessonId.length === 0) {
            // Remove the entire item from the cart
            cart.splice(i, 1);
            // Decrement the index to account for the removed item
            i--;
          }
          break;
        } else {
          throw new Error("Item not found in cart");
        }
      }
    }
    revalidatePath("/cart");
    await user.save();
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { message: "Error removing item from cart", error };
  }
}

export async function getCartLessons(userId: string) {
  // Connect to the database
  await connectToDB();
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const cart = await user.cart;
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.log(error);
    throw error; // Rethrow or handle as needed
  }
}
export async function fetchCartItems(userId: string) {
  // Connect to the database
  await connectToDB();

  if (!userId) {
    throw new Error("User ID not provided");
  }

  const user = await User.findById(userId);

  try {
    const cartItems = await user.cart;
    const lessonsAndCourses = [];

    for (const item of cartItems) {
      // Find the course by its ID
      const course = await Course.findById(item.courseId);
      if (course) {
        // Find the lessons for the course
        const lessons = await Lesson.find({ courseId: course._id });
        const filteredLessons = lessons.filter((lesson) =>
          item.lessonId.includes(lesson._id.toString())
        );
        lessonsAndCourses.push({
          courseId: course._id,
          title: course.title,
          description: course.description,
          price: course.price,
          theme: course.theme,
          image: course.image,
          lessons: filteredLessons.map((lesson) => ({
            _id: lesson._id,
            title: lesson.title,
            content: lesson.content,
            price: lesson.price,
            video: lesson.video,
          })),
        });
      }
    }

    return JSON.parse(JSON.stringify(lessonsAndCourses));
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
}
export async function submitPayment(
  token: string,
  product: any[],
  userId: string,
  amount: number
) {
  try {
    await connectToDB();
    if (!userId) {
      throw new Error("User ID not provided");
    }
    const user = await User.findById(userId);
    const cart = user.cart;
    const paymentRequest = {
      idempotencyKey: randomUUID(),
      sourceId: token,
      amountMoney: {
        currency: "USD",
        amount: amount,
      },
    };

    const { body: response } = await paymentsApi.createPayment(paymentRequest);
    const paymentResponse = JSON.parse(response);

    if (paymentResponse) {
      if (
        paymentResponse.payment &&
        paymentResponse.payment.status === "COMPLETED"
      ) {
        const order = new Order({
          userId: userId,
          items: product,
          currency: "USD",
          price: amount,
          date: new Date(),
        });

        await order.save();

        await user.orders.push(order._id);

        user.cart = [];
        await user.save();
        revalidatePath("/cart");

        return order._id;
      } else {
        console.error("Payment failed:", paymentResponse);
        throw new Error("Payment failed");
      }
    } else {
      console.error("No payment response received");
      throw new Error("No payment response received");
    }
  } catch (error) {
    console.error("Error submitting payment:", error);
    throw error;
  }
}

export async function getUserOrders(userId: string) {
  await connectToDB();
  if (!userId) {
    throw new Error("User ID not provided");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const orders = await Order.find({ userId: userId });
    const lessonsAndCourses = [];

    for (const order of orders) {
      for (const item of order.items) {
        const course = await Course.findById(item.courseId);
        if (!course) console.error("Course not found");

        if (course) {
          const lessons = await Lesson.find({ courseId: course._id });
          const orderedLessonIds = item.lessons.map((lesson: any) =>
            lesson._id.toString()
          );

          const filteredLessons = lessons.filter((lesson) =>
            orderedLessonIds.includes(lesson._id.toString())
          );

          // Check if the course already exists in lessonsAndCourses
          let courseInArray = lessonsAndCourses.find(
            (courseObj) => courseObj.courseId === course._id
          );

          if (courseInArray) {
            // Append the filtered lessons to the existing course object
            courseInArray.lessons = courseInArray.lessons.concat(
              filteredLessons.map((lesson) => ({
                _id: lesson._id,
                title: lesson.title,
                description: lesson.description,
                content: lesson.content,
                video: lesson.video,
                price: lesson.price,
              }))
            );
          } else {
            // Create a new course object and push it into the array
            lessonsAndCourses.push({
              courseId: course._id,
              title: course.title,
              description: course.description,
              price: course.price,
              theme: course.theme,
              image: course.image,
              lessons: filteredLessons.map((lesson) => ({
                _id: lesson._id,
                title: lesson.title,
                description: lesson.description,
                content: lesson.content,
                video: lesson.video,
                price: lesson.price,
              })),
            });
          }
        }
      }
    }
    return JSON.parse(JSON.stringify(lessonsAndCourses));
  } catch (error) {
    console.log(error);
    throw error; // Rethrow or handle as needed
  }
}
export async function validateLesson(formData: FormData) {
  await connectToDB();
  const { lessonId, courseId, userId } = Object.fromEntries(formData);
  if (!lessonId || !courseId || !userId) {
    throw new Error("Missing required fields");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const findCourse = user.validatedLessons.find(
      (item: { courseId: { toString: () => FormDataEntryValue } }) =>
        item.courseId.toString() === courseId
    );
    if (!findCourse) {
      user.validatedLessons.push({ courseId, lessonId: [lessonId] });
    } else {
      const index = user.validatedLessons.indexOf(findCourse);
      user.validatedLessons[index].lessonId.push(lessonId);
    }

    revalidatePath(`/library/${courseId}/${lessonId}`);
    await user.save();
  } catch (error) {
    console.log(error);
  }
}
export async function getValidatedLessons(userId: string) {
  await connectToDB();
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (!userId) {
    throw new Error("User ID not provided");
  }
  try {
    return user.validatedLessons;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow or handle as needed
  }
}

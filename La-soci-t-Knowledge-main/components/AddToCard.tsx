"use client";
import { useSession } from "next-auth/react";
import {
  addToCart,
  getCartLessons,
  getUserOrders,
} from "@/actions/user.actions";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Lesson {
  _id: string;
  title: string;
  price: number;
}
interface Session {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface Course {
  _id: string;
  price: number;
  theme: string;
}

interface OrderItem {
  lessons: Lesson[];
}

interface AddToCardProps {
  course: Course;
  lessons: Lesson[];
}

const AddToCard: React.FC<AddToCardProps> = ({ course, lessons }) => {
  const { data: session } = useSession();
  const [existingCartItems, setExistingCartItems] = useState<OrderItem[]>([]);
  const [existingOrderItems, setExistingOrderItems] = useState<OrderItem[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  // @ts-ignore
  const userId = session?.user.id;
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        const cartItems = await getCartLessons(userId);
        setExistingCartItems(cartItems);
      };
      fetchCartItems();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchOrderItems = async () => {
        const orderItems = await getUserOrders(userId);
        setExistingOrderItems(orderItems);
      };
      fetchOrderItems();
    }
  }, [userId]);

  const handleCheckboxChange = (lessonId: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedIds([...checkedIds, lessonId]);
    } else {
      setCheckedIds(checkedIds.filter((id) => id !== lessonId));
    }
  };

  const handleClick = async () => {
    await addToCart(course._id, checkedIds, userId);
    router.push("/cart");
  };

  const isLessonInCart = (lessonId: string) => {
    return existingCartItems.some((item: any) =>
      item.lessonId.includes(lessonId)
    );
  };

  const isAllLessonsInCart = () => {
    return lessons.every((lesson) => isLessonInCart(lesson._id));
  };

  const isLessonIsBought = (lessonId: string) => {
    if (!userId) return false;
    return existingOrderItems.some(
      (item) =>
        Array.isArray(item.lessons) &&
        item.lessons.some((lesson) => lesson._id === lessonId)
    );
  };

  const isAllLessonsIsBought = () => {
    return lessons.every((lesson) => isLessonIsBought(lesson._id));
  };

  const conditionalCheckbox = (lesson: Lesson) => {
    if (isLessonIsBought(lesson._id)) {
      return <span>Deja achete</span>;
    } else if (isLessonInCart(lesson._id)) {
      return <span>Deja dans le panier</span>;
    } else {
      return (
        <input
          type="checkbox"
          className="w-4 h-4 rounded-full p-2"
          name={lesson.title}
          onChange={(e) => handleCheckboxChange(lesson._id, e.target.checked)}
        />
      );
    }
  };
  const isDisabled = () => {
    if (isAllLessonsIsBought()) {
      return <Link href="/library"> Voir la liste</Link>;
    } else if (isAllLessonsInCart()) {
      return <Link href="/cart"> Voir le panier</Link>;
    } else {
      return (
        <button
          className="btn btn-primary w-full rounded-full mt-6"
          onClick={() => handleClick()}
        >
          {" "}
          Ajouter Au panier
        </button>
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold my-2 lg:text-left text-center">
          La liste de contenu
        </h2>
        {lessons.map((lesson: any) => (
          <div className="flex flex-row gap-4 items-center" key={lesson._id}>
            {conditionalCheckbox(lesson)}
            <p className="text-lg">
              {lesson.title} {lesson.price}€
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 my-2">
        <div className="font-bold">Prix:</div>
        <p>{course.price}€</p>
      </div>
      <div className="flex flex-row gap-4">
        <div className="font-bold">Thème:</div>
        <p>{course.theme}</p>
      </div>
      {lessons.length > 0 ? (
        isDisabled()
      ) : (
        <p>Il n&apos; y a pas de cours dans cette leçon</p>
      )}
    </div>
  );
};

export default AddToCard;

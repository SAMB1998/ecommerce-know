import { fetchCartItems, removeFromCart } from "@/actions/user.actions";
import SquareProvider from "@/components/SquareProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const cartItems: any = await fetchCartItems(session?.user.id);
  // Calculate total price
  const totalPrice = await cartItems.map((item: any) =>
    item.lessons
      .map((lesson: any) => lesson.price)
      .reduce((a: number, b: number) => a + b, 0)
  );

  return (
    <section className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Your Cart <span className="text-primary">({cartItems.length})</span>
      </h1>
      <div className="flex flex-col justify-center items-left w-full gap-6">
        <div className="mt-8 flex flex-col gap-4">
          {cartItems.map((item: any) => (
            <div
              key={item._id}
              className="rounded-lg p-6  border-b border-gray-200"
            >
              <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-4">
                <h3 className="text-xl font-medium">Lessons:</h3>
                <div className="flex flex-col justify-center items-left w-full gap-6 mt-2">
                  {item.lessons.map((lesson: any) => (
                    <>
                      <div
                        key={lesson._id}
                        className="flex flex-row justify-between items-center"
                      >
                        <li
                          key={lesson._id}
                          className="mt-2 text-gray-600 list-none"
                        >
                          <p className="font-semibold">
                            {lesson.title} <span>({lesson.price}€)</span>
                          </p>
                        </li>
                        <form action={removeFromCart}>
                          <input
                            type="hidden"
                            name="userId"
                            value={session?.user.id}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="lessonId"
                            value={lesson._id}
                            readOnly
                          />
                          <button
                            type="submit"
                            className="btn btn-error btn-sm"
                          >
                            Supprimer
                          </button>
                        </form>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <SquareProvider product={cartItems} amount={totalPrice[0]} />
        </div>
      </div>
    </section>
  );
};

export default Page;

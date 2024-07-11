"use client";
import { createLesson, editLesson } from "@/actions/admin.actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const Page = () => {
  const params = useSearchParams();
  const courseId: any = params.get("courseId");
  const action = params.get("action");
  const lessonId: any = params.get("lessonId");
  const router = useRouter();
  return (
    <section className="container mx-auto px-4 mt-4 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-8">
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Ajouter un leçon
        </span>
      </h1>
      <form
        action={action === "add" ? createLesson : editLesson}
        className="w-full"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl font-bold text-gray-700">
              Le nom de leçon
            </span>
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Le nom de leçon"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl font-bold text-gray-700">
              Le lien de video de leçon
            </span>
          </label>
          <input
            type="text"
            name="video"
            required
            placeholder="Le lien de video de leçon"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl font-bold text-gray-700">
              La description de leçon
            </span>
          </label>
          <input
            type="text"
            name="description"
            placeholder="Le prix de leçon"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl font-bold text-gray-700">
              Le prix de leçon
            </span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="Le prix de leçon"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text text-gray-700 text-xl font-bold">
              Le contenu de leçon
            </span>
          </label>
          <textarea
            name="content"
            required
            placeholder="Le contenu de leçon"
            className="textarea textarea-bordered h-40 w-full"
          />
        </div>
        <input
          type="hidden"
          name="courseId"
          value={courseId}
          hidden
          readOnly
          className="input input-bordered w-full"
        />
        {action === "edit" && (
          <input
            type="hidden"
            name="lessonId"
            value={lessonId}
            hidden
            readOnly
          />
        )}

        <div className="flex items-center justify-end mt-8">
          <Link href="/admin/courses" className="btn btn-sm btn-outline mr-4">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            onClick={() => router.back()}
          >
            Ajouter la leçon
          </button>
        </div>
      </form>
    </section>
  );
};

export default Page;

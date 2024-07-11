"use client";

import Link from "next/link";

const Modal = ({
  title,
  inputs,
  themes,
  courseId,
  action,
  modalId,
  modalToClose,
}: any) => {
  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <form action={action}>
            {inputs.map((input: any) => (
              <input
                key={input}
                type="text"
                name={input}
                required
                placeholder={input}
                className="input input-bordered w-full mb-4"
              />
            ))}
            <select name="theme" className="input input-bordered w-full mb-4">
              {themes ? (
                themes.map((theme: any) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))
              ) : (
                <Link href="/admin/themes">Veuillez creer un theme</Link>
              )}
            </select>
            {courseId && (
              <input type="hidden" name="courseId" value={courseId} readOnly />
            )}
            <button
              type="submit"
              className="btn btn-primary block btn-wide mx-auto"
              // @ts-ignore
              onClick={() => document.getElementById(modalToClose).close()}
            >
              {title}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;

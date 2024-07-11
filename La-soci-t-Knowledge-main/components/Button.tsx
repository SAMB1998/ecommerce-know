"use client";
const Button = ({ title, modalToOpen, styles }: any) => {
  const action = () => {
    const modal: any = document.getElementById(modalToOpen);
    modal?.showModal();
  };
  return (
    <div className="flex justify-center items-center">
      <button
        className={` ${
          styles ? styles : "btn btn-primary rounded my-1 w-3/4"
        } text-center`}
        onClick={action}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;

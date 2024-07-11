"use client";
const BurgerButton = () => {
  const handleClick = () => {
    const sideBar = document.getElementById("sidebar");
    sideBar?.classList.toggle("show");
  };
  return (
    <div
      className="burger-button absolute top-3 right-3 text-black w-6 lg:hidden z-999"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm6 4.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default BurgerButton;

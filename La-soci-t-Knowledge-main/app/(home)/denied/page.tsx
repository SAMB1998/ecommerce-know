const Page = () => {
  return (
    <section className="p-4 py-24 min-h-screen bg-blue-100">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center">
          Vous n&apos;avez pas le droit de voir cette page
        </h1>
        <p className="text-center">
          Veuillez vous connecter à votre compte d&apos;Admin pour voir cette
          page
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-28 h-28 my-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Page;

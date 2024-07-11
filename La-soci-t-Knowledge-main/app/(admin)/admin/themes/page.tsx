import { createTheme, deleteTheme, fetchThemes } from "@/actions/admin.actions";

const page = async () => {
  const themes = await fetchThemes();
  return (
    <section className="p-4 min-h-screen">
      <form action={createTheme}>
        <label htmlFor="theme" className="label">
          Theme: <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-4 w-full">
          Submit
        </button>
      </form>
      <div className="flex flex-row flex-wrap my-4 gap-4 items-center justify-center">
        {themes.map((theme: any) => (
          <div key={theme._id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{theme.name}</h2>
              <div className="card-actions justify-end">
                <form action={deleteTheme}>
                  <input type="hidden" name="themeId" value={theme._id} />
                  <button type="submit" className="btn btn-error">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;

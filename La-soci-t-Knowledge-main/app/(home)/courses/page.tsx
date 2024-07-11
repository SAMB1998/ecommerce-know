"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Card from "@/components/Card";
import { fetchCourses, fetchThemes } from "@/actions/admin.actions";

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);
      setFilteredCourses(fetchedCourses); // Initial filtered data
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchThemesArray = async () => {
      const fetchedThemes: any = await fetchThemes();
      setThemes(fetchedThemes);
    };
    fetchThemesArray();
  }, []);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    let filtered = courses.filter((course: any) =>
      course.title.toLowerCase().includes(searchTerm)
    );
    setFilteredCourses(filtered);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrice(event.target.value);
  };

  const handleFilterChange = (filter: string) => {
    const filteredData = courses.filter(
      (course: any) => course.theme.toLowerCase() === filter.toLowerCase()
    );
    setFilteredCourses(filteredData);
  };

  const applyFilters = () => {
    let filteredData = courses;

    if (selectedPrice) {
      filteredData = filteredData.filter(
        (course: any) => course.price.toString() === selectedPrice
      );
    }
    setFilteredCourses(filteredData);
  };

  return (
    <section className="p-4 pt-20 flex flex-col xl:flex-row-reverse bg-blue-100">
      <div className="lg:w-1/4 w-full p-4 rounded-md">
        <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">
          Rechercher
        </h2>

        <input
          type="text"
          placeholder="Rechercher un cours"
          className="w-full px-3 py-3 shadow-lg rounded-full border border-gray-300 focus:outline-none focus:ring-primary focus:ring-1 mb-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="btn btn-primary w-full py-1 shadow-lg rounded-full lg:hidden"
          onClick={() => setDropdown(!dropdown)}
        >
          Filtres
        </button>
        <div className={dropdown ? "block" : "hidden lg:block"}>
          <h2 className="text-xl font-bold mb-6 pb-4 mt-4 border-b border-gray-200">
            Filtrer par prix
          </h2>
          <select
            value={selectedPrice}
            onChange={handlePriceChange}
            className="w-full px-3 py-3 shadow-lg rounded-full border border-gray-300 focus:outline-none focus:ring-primary focus:ring-1 mb-4"
          >
            <option value="">Filtrer par prix</option>
            {courses.map((course: any) => (
              <option key={course.price} value={course.price.toString()}>
                {course.price}€
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary w-full py-1 shadow-lg rounded-full"
            onClick={applyFilters}
          >
            Appliquer les filtres
          </button>
          <div className="flex flex-col gap-4 items-left mb-4 mt-4">
            <h2 className="text-xl font-bold mb-2 pb-4 my-4 border-b border-gray-200">
              Filtrer par thème
            </h2>
            <div className="flex flex-wrap gap-2">
              {themes &&
                themes.map((theme) => (
                  <label
                    key={theme.name}
                    htmlFor={theme.name}
                    className="btn btn-sm p-2 rounded-sm hover:btn-gray-700"
                    onClick={() => handleFilterChange(theme.name)}
                  >
                    {theme.name}
                  </label>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 mx-auto lg:mx-12">
        <h3 className="text-4xl text-primary font-bold my-10">Nos Cours</h3>
        <div className="flex flex-row flex-wrap justify-center items-center gap-6 first-letter:w-3/4">
          {filteredCourses.map((course: any) => (
            <Card
              key={course._id}
              title={course.title}
              image={course.image}
              description={course.description}
              price={course.price}
              theme={course.theme}
              _id={course._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

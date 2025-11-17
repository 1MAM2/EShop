import { useEffect, useState } from "react";
import type { CategoryReadDTO } from "../types/CategoryTypes/CategoryReadDTO";
import { CategoryService } from "../Services/CategoryService";
import { useNavigate, useSearchParams } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryReadDTO[]>([]);
  const navigate = useNavigate();

  //category active durumnu belirleme
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("cat");
  const allActiveCategory = activeCategory === null;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Kategoriler yüklenirken hata:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <ul className="border-b-4 border-b-blue-500 bg-blue-800 text-md sm:text-xl h-[30px] w-full flex p-3 items-center justify-center gap-8 text-white shadow-md xl:text-2xl xl:h-[40px]">
      <li
        className={`font-bold transition-all mb-1.5 cursor-pointer hover:text-blue-500 active:text-blue-300
    ${
      allActiveCategory
        ? "text-white underline underline-offset-4"
        : "hover:text-blue-500 active:text-blue-300"
    }`}
        onClick={() => navigate(`/browse`)}
      >
        All Categories
      </li>
      {categories.map((item) => {
        const isActive = activeCategory === String(item.Id);
        return (
          <li
            key={item.Id}
            className={`hover:text-blue-500 font-bold transition-all text-white mb-1.5 cursor-pointer active:text-blue-300 ${
              isActive
                ? "underline underline-offset-4"
                : "hover:text-blue-500 active:text-blue-300"
            }`}
            onClick={() => navigate(`/browse?cat=${item.Id}`)}
          >
            {item.CategoryName}
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;

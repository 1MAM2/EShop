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
    <ul className="border-b-4 border-b-teal-400 bg-blue-700 text-md sm:text-xl h-[30px] w-full flex p-3 items-center justify-center gap-8 text-white shadow-md xl:text-2xl xl:h-[40px]">
      <li
        className={`font-bold transition-all mb-1.5 cursor-pointer
    ${
      allActiveCategory
        ? "text-white underline underline-offset-4"
        : "hover:text-gray-300 active:text-gray-500"
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
            className={`hover:text-gray-300 font-bold transition-all text-white mb-1.5 cursor-pointer active:text-gray-500 ${
              isActive
                ? "text-gray-500 underline underline-offset-4"
                : "hover:text-gray-300 active:text-gray-800"
                
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

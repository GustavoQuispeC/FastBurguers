"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextProps {
  selectedCategoryName: string;
  setSelectedCategoryName: (categoryName: string) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("Hamburguesas");
  return (
    <CategoryContext.Provider value={{ selectedCategoryName, setSelectedCategoryName }}>
      {children}
    </CategoryContext.Provider>
  );
};
"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextProps {
  selectedCategory: number;
  setSelectedCategory: (category: number) => void;
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
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
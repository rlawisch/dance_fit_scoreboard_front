import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { ICategory } from "../../types/entity-types";

export interface ICategoryContext {
  categoryData: ICategory | undefined;
  getCategoryData: (category_id: number) => void;
}

const CategoryContext = createContext<ICategoryContext>({} as ICategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Player States
  const { accToken, hasValidSession } = usePlayer();

  const [categoryData, setCategoryData] = useState<ICategory>();

  // fetch category data
  const getCategoryData = (category_id: number) => {
    hasValidSession();

    api
      .get(`/categories/${category_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // add player to category

  // remove player from category

  // update category

  return (
    <CategoryContext.Provider value={{ categoryData, getCategoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);

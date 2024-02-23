import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { ICategory } from "../../types/entity-types";
import { ICategoryCreate } from "../../types/form-types";
import { useNavigate } from "react-router-dom";

export interface ICategoryContext {
  categoryData: ICategory | undefined;
  getCategoryData: (category_id: number) => void;
  createCategory: (formData: ICategoryCreate, event_id: number) => void;
  joinCategory: (category_id: number) => void;
}

const CategoryContext = createContext<ICategoryContext>({} as ICategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Player States
  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

  const [categoryData, setCategoryData] = useState<ICategory>();

  const navigate = useNavigate();

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

  // create category
  const createCategory = (formData: ICategoryCreate, event_id: number) => {
    hasAdminRights();

    api
      .post(
        "/categories",
        {
          ...formData,
          event_id: event_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const { category_id, event } = res.data;

        if (res.status === 201) {
          toast.success("Categoria criada com sucesso");
          navigate(`/admin/events/${event.event_id}/categories/${category_id}`);
        } else {
          toast.error("Algo deu errado");
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Algo deu errado");
      });
  };

  // player join category
  const joinCategory = (category_id: number) => {
    hasValidSession();

    api
      .patch(`/categories/${category_id}/join`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success("Adicionado na categoria com sucesso!");
        } else {
          toast.error("Algo deu errado");
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Algo deu errado");
      });
  };

  // remove player from category

  // update category

  // delete category

  const deleteCategory = (category_id: number) => {
    hasAdminRights();

    api
      .delete(`/categories/${category_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        
      })
      .catch((err: any) => {
        console.log(err)
      });
  };

  return (
    <CategoryContext.Provider
      value={{ categoryData, getCategoryData, createCategory, joinCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);

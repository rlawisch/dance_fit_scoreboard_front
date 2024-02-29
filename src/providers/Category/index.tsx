import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { ICategory } from "../../types/entity-types";
import { ICategoryCreate, ICategoryUpdate } from "../../types/form-types";
import { useNavigate } from "react-router-dom";

export interface ICategoryContext {
  categoryData: ICategory | undefined;
  getCategoryData: (category_id: number) => void;
  createCategory: (formData: ICategoryCreate, event_id: number) => void;
  updateCategory: (formData: ICategoryUpdate, category: ICategory) => void;
  deleteCategory: (category_id: number, event_id: number) => void;
  joinCategory: (event_id: number, category_id: number) => void;
}

const CategoryContext = createContext<ICategoryContext>({} as ICategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Player States
  const { accToken, decodedPlayerInfo, hasValidSession, hasAdminRights } =
    usePlayer();

  const [categoryData, setCategoryData] = useState<ICategory>();

  const navigate = useNavigate();

  // fetch category data
  const getCategoryData = async (category_id: number) => {
    hasValidSession();

    try {
      const res = await api.get(`/categories/${category_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      setCategoryData(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  // create category
  const createCategory = async (
    formData: ICategoryCreate,
    event_id: number
  ) => {
    hasAdminRights();

    try {
      const res = await api.post(
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
      );
      console.log(res.data);
      const { category_id } = res.data;

      if (res.status === 201) {
        toast.success("Categoria criada com sucesso");
        navigate(`/admin/events/${event_id}/categories/${category_id}`);
      }
      navigate(`/admin/events/${event_id}/categories/${category_id}`);
    } catch (err: any) {
      console.log(err);
      toast.error("Algo deu errado");
      navigate(`/admin/events/${event_id}`);
    }
  };

  // player join category
  const joinCategory = async (event_id: number, category_id: number) => {
    hasValidSession();

    try {
      const res = await api.patch(`/categories/${category_id}/join`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      console.log(res.data.response);
      if (res.status === 200) {
        toast.success("Adicionado na categoria com sucesso!");

        if (decodedPlayerInfo.role === "admin") {
          navigate(`/admin/events/${event_id}/categories/${category_id}`);
        } else {
          navigate(`/dashboard/events/${event_id}/categories/${category_id}`);
        }
      }
    } catch (err: any) {
      console.log(err);
      if (
        err.response.data.message === "Player already assigned to this Category"
      ) {
        toast.error("Jogador já cadastrado na categoria");
        if (decodedPlayerInfo.role === "admin") {
          navigate(`/admin/events/${event_id}/categories/${category_id}`);
        } else {
          navigate(`/dashboard/events/${event_id}/categories/${category_id}`);
        }
      } else {
        toast.error("Algo deu errado");
        if (decodedPlayerInfo.role === "admin") {
          navigate(`/admin/events/${event_id}/categories/${category_id}`);
        } else {
          navigate(`/dashboard/events/${event_id}/categories/${category_id}`);
        }
      }
    }
  };

  // update category
  const updateCategory = async (
    formData: ICategoryUpdate,
    category: ICategory
  ) => {
    hasAdminRights();

    const { category_id, event: event_id } = category;

    try {
      const res = await api.patch(`/categories/${category_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 200) {
        toast.success("Informações da categoria atualizadas");
        navigate(`/admin/events/${event_id}/categories/${category_id}`);
      } else {
        toast.error("Algo deu errado");
        navigate(`/admin/events/${event_id}/categories/${category_id}`);
      }
      console.log(res);
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
        navigate(`/admin/events/${event_id}/categories/${category_id}`);
      }
      navigate(`/admin/events/${event_id}/categories/${category_id}`);
    }
  };

  // delete category
  const deleteCategory = async (category_id: number, event_id: number) => {
    hasAdminRights();

    try {
      const res = await api.delete(`/categories/${category_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Categoria deletada com sucesso");
        navigate(`/admin/events/${event_id}`);
      }
      navigate(`/admin/events/${event_id}`);
    } catch (err: any) {
      console.log(err);
      navigate(`/admin/events/${event_id}`);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryData,
        getCategoryData,
        createCategory,
        updateCategory,
        deleteCategory,
        joinCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);

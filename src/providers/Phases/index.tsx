import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { IPhase } from "../../types/entity-types";
import { IPhaseRealCreate } from "../../types/form-types";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../Category";

export interface IPhasesContext {
  createPhase: (formData: IPhaseRealCreate) => void;
}

const PhasesContext = createContext<IPhasesContext>({} as IPhasesContext);

export const PhasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  // Player States
  const { accToken, hasAdminRights } = usePlayer();

  // Category Data

  const { categoryData } = useCategory();

  // API Consuming

  const createPhase = (formData: IPhaseRealCreate) => {
    hasAdminRights();

    api
      .post("/phases", formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        console.log(res);

        if (res.status === 201) {
          toast.success("Fase criada com sucesso");
          navigate(
            `/admin/events/${categoryData?.event.event_id}/categories/${categoryData?.category_id}`,
          );
        } else {
          toast.error("Algo deu errado");
        }
      })
      .catch((err: any) => {
        console.log(err);

        if (
          err.response.data.message ===
          "This Category cannot have any more Phases"
        ) {
          toast.error("A categoria atingiu o limite máximo de fases");
          navigate(
            `/admin/events/${categoryData?.event.event_id}/categories/${categoryData?.category_id}`,
          );
        } else if (
          err.response.data.message ===
          "A Phase with this Phase number already exists"
        ) {
          toast.error("Uma fase com este número já existe");
          navigate(
            `/admin/events/${categoryData?.event.event_id}/categories/${categoryData?.category_id}`,
          );
        }
      });
  };

  return (
    <PhasesContext.Provider value={{ createPhase }}>
      {children}
    </PhasesContext.Provider>
  );
};

export const usePhases = () => useContext(PhasesContext);

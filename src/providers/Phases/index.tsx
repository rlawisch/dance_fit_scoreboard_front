import { createContext, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { IPhaseRealCreate, IPhaseRealUpdate } from "../../types/form-types";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../Category";
import { ICategory } from "../../types/entity-types";

export interface IPhasesContext {
  createPhase: (formData: IPhaseRealCreate, category: ICategory) => void;
  updatePhase: (formData: IPhaseRealUpdate, phase_id: number, category: ICategory) => void;
}

const PhasesContext = createContext<IPhasesContext>({} as IPhasesContext);

export const PhasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  // Player States
  const { accToken, hasAdminRights } = usePlayer();

  // API Consuming
  const createPhase = (formData: IPhaseRealCreate, category: ICategory) => {
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
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
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
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
          );
        } else if (
          err.response.data.message ===
          "A Phase with this Phase number already exists"
        ) {
          toast.error("Uma fase com este número já existe");
          navigate(
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
          );
        } else if (err.response.data.message === "Internal server error") {
          toast.error("Algo deu errado");
          navigate(
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
          );
        }

        navigate(
          `/admin/events/${category.event.event_id}/categories/${category.category_id}`
        );
      });
  };

  const updatePhase = (formData: IPhaseRealUpdate, phase_id: number, category: ICategory) => {
    hasAdminRights();

    api
      .patch(`/phases/${phase_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Informações da fase atualizadas");
        }
        navigate(
          `/admin/events/${category.event.event_id}/categories/${category.category_id}`
        ) 
      })
      .catch((err: any) => {
        if (
          err.response.data.message ===
          "Cannot set music number lower than the actual number of musics already assigned to this phase"
        ) {
          toast.error(
            "Não é possível atualizar o número de músicas da fase para um número menor do que o número de músicas que já estão cadastradas nesta fase"
          );
          navigate(
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
          );
        } else if (
          err.response.data.message ===
          "Music modes cannot be updated since there are musics in this phase that will not respect the new modes available"
        ) {
          toast.error(
            "Não é possível atualizar os modos disponíveis na fase pois uma música presente na fase não estará dentro dos modos escolhidos"
          );
          navigate(
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
          );
        } else if (err.response.data.message === "Internal server error") {
          toast.error("Algo deu errado");
          navigate(
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
          );
        }
        navigate(
          `/admin/events/${category.event.event_id}/categories/${category.category_id}`
        );
      });
  };

  return (
    <PhasesContext.Provider value={{ createPhase, updatePhase }}>
      {children}
    </PhasesContext.Provider>
  );
};

export const usePhases = () => useContext(PhasesContext);

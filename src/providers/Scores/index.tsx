import { createContext, useContext } from "react";
import * as React from "react";
import {
  IScoreCreate,
  IScoreCreateByAdmin,
  IScoreUpdate,
} from "../../types/form-types";
import { usePlayer } from "../Players";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useCategory } from "../Category";

export interface IScoreContext {
  createScore: (formData: IScoreCreate) => void;
  adminCreateScore: (formData: IScoreCreateByAdmin) => void;
  updateScore: (formData: IScoreUpdate, score_id: number) => void;
  deleteScore: (score_id: number) => void;
}

const ScoreContext = createContext<IScoreContext>({} as IScoreContext);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

  const { categoryRefreshTrigger, setCategoryRefreshTrigger } = useCategory()

  const createScore = async (formData: IScoreCreate) => {
    try {
      await hasValidSession();

      const res = await api.post(`/scores`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      console.log(res);

      if (res.status === 201) {
        toast.success("Score criado com sucesso");
        setCategoryRefreshTrigger(!categoryRefreshTrigger)
      }
    } catch (err: any) {
      console.log(err);

      if (
        err.response.data.message ===
        "Player is not a participant of selected Event"
      ) {
        toast.error("Jogador não é participante do evento");
      } else if (
        err.response.data.message ===
        "Player is not assigned to this Category in this Event"
      ) {
        toast.error("Jogador não é participante da categoria");
      } else if (
        err.response.data.message ===
        "There can be only one instance of a Score created by a Player to a Music, inside a Category Phase of an Event"
      ) {
        toast.error(
          "Já foi cadastrado com os mesmos dados (evento/categoria/fase)"
        );
      }
    }
  };

  const adminCreateScore = async (formData: IScoreCreateByAdmin) => {
    try {
      await hasAdminRights();

      const res = await api.post(`/scores/admin`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      console.log(res);

      if (res.status === 201) {
        toast.success("Score criado com sucesso");
        setCategoryRefreshTrigger(!categoryRefreshTrigger)

      }
    } catch (err: any) {
      console.log(err);

      if (
        err.response.data.message ===
        "Player is not a participant of selected Event"
      ) {
        toast.error("Jogador não é participante do evento");
      } else if (
        err.response.data.message ===
        "Player is not assigned to this Category in this Event"
      ) {
        toast.error("Jogador não é participante da categoria");
      } else if (
        err.response.data.message ===
        "There can be only one instance of a Score created by a Player to a Music, inside a Category Phase of an Event"
      ) {
        toast.error(
          "Já foi cadastrado com os mesmos dados (evento/categoria/fase)"
        );
      }
    }
  };

  const updateScore = async (formData: IScoreUpdate, score_id: number) => {
    try {
      hasAdminRights();

      const res = await api.patch(`/scores/${score_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Score atualizado com sucesso");
        setCategoryRefreshTrigger(!categoryRefreshTrigger)

      }
    } catch (err: any) {
      console.log(err)
      if (err.response.data.message === "Failed to update score") {
        toast.error("Algo deu errado");
      } else {
        toast.error("Algo deu errado");
      }
    }
  };

  const deleteScore = async (score_id: number) => {
    try {
      await hasAdminRights();

      const res = await api.delete(`/scores/${score_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Score deletado com sucesso");
        setCategoryRefreshTrigger(!categoryRefreshTrigger)

      }
    } catch (err: any) {
      if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  return (
    <ScoreContext.Provider
      value={{ createScore, adminCreateScore, updateScore, deleteScore }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);

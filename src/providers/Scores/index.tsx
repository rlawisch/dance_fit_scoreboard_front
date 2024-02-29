import { createContext, useContext } from "react";
import * as React from "react";
import { IScoreCreate } from "../../types/form-types";
import { usePlayer } from "../Players";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { ICategory } from "../../types/entity-types";

export interface IScoreContext {
  createScore: (scoreInput: IScoreCreate) => void;
  deleteScore: (category: ICategory, score_id: number) => void;
}

const ScoreContext = createContext<IScoreContext>({} as IScoreContext);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

  const navigate = useNavigate();

  // Create Score (logged in player)
  const createScore = (scoreInput: IScoreCreate) => {
    hasValidSession();

    api
      .post(`/scores`, scoreInput, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        console.log(res);

        if (res.status === 201) {
          toast.success("Score criado com sucesso");
          navigate(
            `/dashboard/events/${scoreInput.event_id}/categories/${scoreInput.category_id}`
          );
        }
      })
      .catch((err: any) => {
        console.log(err);

        if (
          err.response.data.message ===
          "Player is not a participant of selected Event"
        ) {
          toast.error("Jogador não é participante do evento");
          navigate(
            `/dashboard/events/${scoreInput.event_id}/categories/${scoreInput.category_id}`
          );
        } else if (
          err.response.data.message ===
          "Player is not assigned to this Category in this Event"
        ) {
          toast.error("Jogador não é participante da categoria");
          navigate(
            `/dashboard/events/${scoreInput.event_id}/categories/${scoreInput.category_id}`
          );
        } else if (
          err.response.data.message ===
          "There can be only one instance of a Score created by a Player to a Music, inside a Category Phase of an Event"
        ) {
          toast.error(
            "Já foi cadastrado com os mesmos dados (evento/categoria/fase)"
          );
          navigate(
            `/dashboard/events/${scoreInput.event_id}/categories/${scoreInput.category_id}`
          );
        }
        navigate(
          `/dashboard/events/${scoreInput.event_id}/categories/${scoreInput.category_id}`
        );
      });
  };

  // Find All (logged in player)

  // Find By Id (maybe useless... Maybe a URL State filter is better using above route)

  // Update Score (admin only, validation)

  // Delete Score (admin only)

  const deleteScore = (category: ICategory, score_id: number) => {
    hasAdminRights();

    api
      .delete(`/scores/${score_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Score deletado com sucesso");
          navigate(
            `/admin/events/${category.event.event_id}/categories/${category.category_id}`
          );
        }
      })
      .catch((err: any) => {
        if (err.response.data.message === "Internal server error") {
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
    <ScoreContext.Provider value={{ createScore, deleteScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);

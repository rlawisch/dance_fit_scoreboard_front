import { createContext, useContext } from "react";
import * as React from "react";
import {
  IScoreCreateByAdmin,
  IScoreUpdate,
} from "../../types/form-types";
import { usePlayer } from "../Players";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useCategory } from "../Category";
import { useState } from "react";
import { IScore } from "../../types/entity-types";

export interface IScoreContext {
  eventScores: IScore[];
  pendingScores: IScore[];
  isLoadingSubmitScore: boolean;
  scoreRefreshTrigger: boolean;
  submitScore: (formData: FormData) => Promise<void>;
  adminCreateScore: (formData: IScoreCreateByAdmin) => void;
  getScoresByEvent: (event_id: number) => void;
  getPendingScoresByEvent: (event_id: number) => void
  updateScore: (formData: IScoreUpdate, score_id: number) => void;
  deleteScore: (score_id: number) => void;
  adminValidateScore: (score_id: number) => void;
  adminInvalidateScore: (score_id: number) => void;
}

const ScoreContext = createContext<IScoreContext>({} as IScoreContext);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken } = usePlayer();

  const { categoryRefreshTrigger, setCategoryRefreshTrigger } = useCategory();

  const [eventScores, setEventScores] = useState<IScore[]>([]);

  const [pendingScores, setPendingScores] = useState<IScore[]>([])

  const [scoreRefreshTrigger, setScoreRefreshTrigger] = useState<boolean>(true)

  const [isLoadingSubmitScore, setIsLoadingSubmitScore] = useState<boolean>(false)

  const submitScore = async (formData: FormData): Promise<void> => {
    try {
      setIsLoadingSubmitScore(true)
      const res = await api.post(`/scores`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (res.status === 201) {
        toast.success("Score criado com sucesso");
        setIsLoadingSubmitScore(false)
        setScoreRefreshTrigger(!scoreRefreshTrigger)
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
          "Já foi cadastrado um Score com os mesmos dados para validação"
        );
      }
    }
  };

  const adminCreateScore = async (formData: IScoreCreateByAdmin) => {
    try {
      const res = await api.post(`/scores/admin`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 201) {
        toast.success("Score criado com sucesso");
        setCategoryRefreshTrigger(!categoryRefreshTrigger);
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

  const adminValidateScore = async (score_id: number) => {
    try {
      const res = await api.post(`/scores/admin/validate/${score_id}`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`
        }
      })

      console.log(res.status)

      if (res.status === 201) {
        setScoreRefreshTrigger(!scoreRefreshTrigger)
        toast.success("Score validado com sucesso")
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const adminInvalidateScore = async (score_id: number) => {
    try {
      const res = await api.delete(`/scores/admin/invalidate/${score_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`
        }
      })

      if (res.status === 200) {
        setScoreRefreshTrigger(!scoreRefreshTrigger)
        toast.success("Score invalidado com sucesso")
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const getScoresByEvent = async (event_id: number) => {
    try {
      const res = await api.get(`/scores/events/${event_id}`);

      if (res.status === 200) {
        setEventScores(res.data);
      }
    } catch (err: any) {
      console.log(err)
    }
  };

  const getPendingScoresByEvent = async (event_id: number) => {
    try {
      const res = await api.get(`/scores/events/${event_id}/pending`)

      if (res.status === 200) {
        setPendingScores(res.data)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const updateScore = async (formData: IScoreUpdate, score_id: number) => {
    try {
      const res = await api.patch(`/scores/${score_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Score atualizado com sucesso");
        setCategoryRefreshTrigger(!categoryRefreshTrigger);
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === "Failed to update score") {
        toast.error("Algo deu errado");
      } else {
        toast.error("Algo deu errado");
      }
    }
  };

  const deleteScore = async (score_id: number) => {
    try {
      const res = await api.delete(`/scores/${score_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Score deletado com sucesso");
        setCategoryRefreshTrigger(!categoryRefreshTrigger);
      }
    } catch (err: any) {
      if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        eventScores,
        pendingScores,
        isLoadingSubmitScore,
        scoreRefreshTrigger,
        submitScore,
        adminCreateScore,
        getScoresByEvent,
        getPendingScoresByEvent,
        updateScore,
        deleteScore,
        adminValidateScore,
        adminInvalidateScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);

import { createContext, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { IPhaseRealCreate, IPhaseRealUpdate } from "../../types/form-types";
import { IPhase } from "../../types/entity-types";

export interface IPhasesContext {
  createPhase: (formData: IPhaseRealCreate) => void;
  updatePhase: (formData: IPhaseRealUpdate, phase_id: number) => void;
  addMusic: (phase: IPhase, music_id: number) => void;
  removeMusic: (phase: IPhase, music_id: number) => void;
  deletePhase: (phase_id: number) => void
}

const PhasesContext = createContext<IPhasesContext>({} as IPhasesContext);

export const PhasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken, hasAdminRights } = usePlayer();

  const createPhase = async (formData: IPhaseRealCreate) => {
    hasAdminRights();

    try {
      const res = await api.post("/phases", formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      console.log(res);

      if (res.status === 201) {
        toast.success("Fase criada com sucesso");
      } else {
        toast.error("Algo deu errado");
      }
    } catch (err: any) {
      console.log(err);

      if (
        err.response.data.message ===
        "This Category cannot have any more Phases"
      ) {
        toast.error("A categoria atingiu o limite máximo de fases");
      } else if (
        err.response.data.message ===
        "A Phase with this Phase number already exists"
      ) {
        toast.error("Uma fase com este número já existe");
      } else if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  const updatePhase = async (formData: IPhaseRealUpdate, phase_id: number) => {
    hasAdminRights();

    try {
      const res = await api.patch(`/phases/${phase_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 200) {
        toast.success("Informações da fase atualizadas");
      }
    } catch (err: any) {
      if (
        err.response.data.message ===
        "Cannot set music number lower than the actual number of musics already assigned to this phase"
      ) {
        toast.error(
          "Não é possível atualizar o número de músicas da fase para um número menor do que o número de músicas que já estão cadastradas nesta fase"
        );
      } else if (
        err.response.data.message ===
        "Music modes cannot be updated since there are musics in this phase that will not respect the new modes available"
      ) {
        toast.error(
          "Não é possível atualizar os modos disponíveis na fase pois uma música presente na fase não estará dentro dos modos escolhidos"
        );
      } else if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  const addMusic = async (phase: IPhase, music_id: number) => {
    hasAdminRights();

    try {
      const res = await api.patch(
        `/phases/${phase.phase_id}/add_music`,
        {
          music_id: music_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(`Música adicionada a Fase com sucesso`);
      }
    } catch (err: any) {
      console.log(err);
      if (
        err.response.data.message ===
        "Music level is not in range with this Category"
      ) {
        toast.error(
          "O Nível da música escolhida não está na faixa permitida pela categoria"
        );
      } else if (
        err.response.data.message === "Music is already assigned to this phase"
      ) {
        toast.error("Esta música já esta cadastrada nesta fase");
      } else if (
        err.response.data.message ===
        "This Phase has already reached the maximum number of Musics"
      ) {
        toast.error("A Fase já alcançou o número máximo de músicas");
      } else if (
        err.response.data.message ===
        "This music mode is not available in this Event Category Phase"
      ) {
        toast.error(
          "O modo da música escolhida não está entre os modos permitidos nesta fase"
        );
      } else if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  const removeMusic = async (phase: IPhase, music_id: number) => {
    hasAdminRights();

    try {
      const res = await api.patch(
        `/phases/${phase.phase_id}/remove_music`,
        {
          music_id: music_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Música removida da fase com sucesso");
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  const deletePhase = async (phase_id: number) => {
    try {
      const res = await api.delete(`/phases/${phase_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      console.log(res);

      if (res.status === 200) {
        toast.success("Fase deletada com sucesso");
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  return (
    <PhasesContext.Provider
      value={{ createPhase, updatePhase, addMusic, removeMusic, deletePhase }}
    >
      {children}
    </PhasesContext.Provider>
  );
};

export const usePhases = () => useContext(PhasesContext);

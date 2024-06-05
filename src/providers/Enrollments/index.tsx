import React, { createContext, useContext, useState } from "react";
import { usePlayer } from "../Players";
import { IEnrollment } from "../../types/entity-types";
import api from "../../services/api";
import { toast } from "react-toastify";

export interface IEnrollmentsContenxt {
  enrollments: IEnrollment[];
  createEnrollment: (player_id: number, event_id: number) => void;
  getEnrollments: () => void;
  acceptEnrollment: (enrollment: IEnrollment) => void;
  removeEnrollment: (enrollment_id: number) => void;
}

const EnrollmentsContext = createContext<IEnrollmentsContenxt>(
  {} as IEnrollmentsContenxt
);

export const EnrollmentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken } = usePlayer();

  const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);

  const [enrollmentRefreshTrigger, setEnrollmentRefreshTrigger] =
    useState<boolean>(true);

  const createEnrollment = async (player_id: number, event_id: number) => {
    try {
      const res = await api.post(
        `/enrollments`,
        {
          player_id: player_id,
          event_id: event_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success(
          "Inscrição feita! Aguarde a aprovação de um Administrador"
        );
        setEnrollmentRefreshTrigger(!enrollmentRefreshTrigger);
      }
    } catch (err: any) {
      console.log(err);

      if (err.response.data.message === "There is already an enrollment for this player in this event") {
        toast.error("Já existe uma inscrição para este jogador, neste evento. Por favor, aguarde a aprovação de um Admnistrador.")
      }

      if (err.response.data.message === "Player is already a participant in this event") {
        toast.error("Jogador já faz parte do evento")
      }
      
    }
  };

  const getEnrollments = async () => {
    try {
      const res = await api.get(`/enrollments`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      setEnrollments(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const removeEnrollment = async (enrollment_id: number) => {
    try {
      const res = await api.delete(`/enrollments/${enrollment_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Inscrição removida com sucesso");
        setEnrollmentRefreshTrigger(!enrollmentRefreshTrigger)
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const acceptEnrollment = async (enrollment: IEnrollment) => {
    try {
      const { event, player, enrollment_id } = enrollment;
      
      // call api`s function to add player to event
      const res1 = await api.patch(
        `/events/${event.event_id}/admin/add_player`,
        {
          player_id: player.player_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res1.status === 200) {
        toast.success("Jogador inscrito no evento com sucesso")
      }

      // removes the enrollment
      const res2 = await api.delete(`/enrollments/${enrollment_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res2.status === 200) {
        toast.success("Inscrição removida com sucesso")
      }

    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <EnrollmentsContext.Provider
      value={{
        enrollments,
        createEnrollment,
        getEnrollments,
        acceptEnrollment,
        removeEnrollment,
      }}
    >
      {children}
    </EnrollmentsContext.Provider>
  );
};

export const useEnrollments = () => useContext(EnrollmentsContext);

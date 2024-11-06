import { FunctionComponent, useEffect } from "react";
import {
  EventInfoWrapper,
  GlobalContainer,
  PlayerInfoWrapper,
  PlayerMiniature,
  Table,
  TableHeader,
} from "../../styles/global";
import { useEnrollments } from "../../providers/Enrollments";
import Button from "../../components/Button";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa6";
import DeleteButton from "../../components/Button_Delete";
import useDynamicModal from "../../providers/DynamicModal";
import Modal from "../../components/Modal";
import ComfortLevelCreateForm from "../../components/Forms/ComfortLevelCreate";

interface UDashboard_EnrollmentsProps {}

const UDashboard_Enrollments: FunctionComponent<
  UDashboard_EnrollmentsProps
> = () => {
  const { enrollments, getEnrollments, removeEnrollment } =
    useEnrollments();

  useEffect(() => {
    getEnrollments();
  }, []);

  const {
    isModalOpen: isAcceptEnrollmentModalOpen,
    openModal: openAcceptEnrollmentModal,
    closeModal: closeAcceptEnrollmentModal,
  } = useDynamicModal();

  return (
    <GlobalContainer>
      <h1>Inscrições</h1>

      <Table>
        <thead>
          <tr>
            <TableHeader>
              <h2>Pendentes</h2>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {enrollments?.map((enrollment) => (
            <tr key={enrollment.enrollment_id}>
              <td>
                <PlayerInfoWrapper>
                  <PlayerMiniature
                    src={
                      enrollment.player.profilePicture
                        ? enrollment.player.profilePicture
                        : "/img/default_player.png"
                    }
                    alt="Mini Profile Picture"
                  />
                  {enrollment.player.nickname}
                  <p>dejesa participar do evento:</p>
                  <EventInfoWrapper>{enrollment.event.name}</EventInfoWrapper>

                  <Button onClick={() => openAcceptEnrollmentModal(enrollment.enrollment_id)}>
                    <FaCheck />
                  </Button>

                  <Modal
                    isOpen={isAcceptEnrollmentModalOpen(
                      enrollment.enrollment_id
                    )}
                    onClose={() =>
                      closeAcceptEnrollmentModal(enrollment.enrollment_id)
                    }
                  >
                    <ComfortLevelCreateForm enrollment={enrollment} />
                  </Modal>

                  <DeleteButton
                    onClick={() => removeEnrollment(enrollment.enrollment_id)}
                  >
                    <ImCross />
                  </DeleteButton>
                </PlayerInfoWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GlobalContainer>
  );
};

export default UDashboard_Enrollments;

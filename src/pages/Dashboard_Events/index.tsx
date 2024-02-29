import { FunctionComponent, useEffect } from "react";
import { GlobalContainer, Table } from "../../styles/global";
import { useEvents } from "../../providers/Events";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

interface DashboardEventsProps {}

const DashboardEvents: FunctionComponent<DashboardEventsProps> = () => {
  const { events, getEvents } = useEvents();

  const navigate = useNavigate();

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <GlobalContainer>
      {events && (
        <Table>
          <thead>
            <tr>
              <th>
                <h4>Eventos</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>
                  {event.name}
                  <Button onClick={() => navigate(`/dashboard/events/${event.event_id}`)}>
                    <AiOutlineArrowRight />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </GlobalContainer>
  );
};

export default DashboardEvents;

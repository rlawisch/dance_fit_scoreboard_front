import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";
import { useEvent } from "../../providers/Events";

interface DashboardEventsProps {}

const DashboardEvents: FunctionComponent<DashboardEventsProps> = () => {

  const { events } = useEvent();

  return (
    <GlobalContainer>
      <p>PAGINA DE EVENTOS</p>
    </GlobalContainer>
  );
};

export default DashboardEvents;

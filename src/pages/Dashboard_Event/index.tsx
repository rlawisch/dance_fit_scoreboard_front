import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";
import { DashboardEventContainer } from "./styles";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

interface DashboardEventProps {}

const DashboardEvent: FunctionComponent<DashboardEventProps> = () => {
  return (
    <GlobalContainer>
      <DashboardEventContainer>
        <Link to={"/dashboard/events"}>
          <Button vanilla={true}>Voltar</Button>
        </Link>
      </DashboardEventContainer>
    </GlobalContainer>
  );
};

export default DashboardEvent;

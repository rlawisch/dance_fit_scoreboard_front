import Button from "../../components/Button";
import { GlobalContainer } from "../../styles/global";
import { Link, useNavigate } from "react-router-dom";
import { HomeContainer } from "./styles";

const Home = () => {

  const navigate = useNavigate()

  return (
    <GlobalContainer>
      <HomeContainer>
        <Button onClick={() => navigate(`/public/events`)}>
          Entrar como Visitante
        </Button>

        <Link to="/login">
          <Button vanilla={true}>Login</Button>
        </Link>
      </HomeContainer>
    </GlobalContainer>
  );
};

export default Home;

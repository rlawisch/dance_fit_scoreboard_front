import Button from "../../components/Button";
import { GlobalContainer, HomeLogo } from "../../styles/global";
import { Link, useNavigate } from "react-router-dom";
import { HomeContainer } from "./styles";
import { useTheme } from "styled-components";

const Home = () => {
  const theme = useTheme()

  const navigate = useNavigate()

  return (
    <GlobalContainer>
      <HomeContainer>

        <HomeLogo
          src={theme.title === "dark" ? 'static/logos/Logo Flat Transparente Branco.png' : 'static/logos/Logo Flat Transparente Preto.png'}
          alt="Home Logo"
        />
        <h1>Scoreboard</h1>
        <Button onClick={() => navigate(`/udashboard/home`)}>
          Entrar como Visitante
        </Button>

        <Link to="/login">
          <Button vanilla={true}>Login</Button>
        </Link>

        <p>Bem vindo(a) ao Dance Fit Scoreboard! </p>

        {/* Adicionar lista de links da Dance Fit
        - Youtube
        - Instagram <FaInstagram />
        - Site
         */}

      </HomeContainer>
    </GlobalContainer>
  );
};

export default Home;

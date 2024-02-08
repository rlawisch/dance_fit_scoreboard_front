import Button from "../../components/Button";
import { GlobalContainer } from "../../styles/global";
import { Link } from "react-router-dom";
import { HomeContainer } from "./styles";

const Home = () => {
  return (
    <GlobalContainer>
      <HomeContainer>
        <Link to="/login">
          <Button vanilla={true}>Login</Button>
        </Link>

        <Link to="/signup">
          <Button vanilla={true}>Signup</Button>
        </Link>
      </HomeContainer>
    </GlobalContainer>
  );
};

export default Home;

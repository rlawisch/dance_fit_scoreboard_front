import Button from "../../components/Button";
import { GlobalContainer } from "../../styles/global";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <GlobalContainer>
      <Link to="/login">
        <Button vanilla={true}>Login</Button>
      </Link>

      <Link to="/signup">
        <Button vanilla={true}>Signup</Button>
      </Link>
    </GlobalContainer>
  );
};

export default Home;

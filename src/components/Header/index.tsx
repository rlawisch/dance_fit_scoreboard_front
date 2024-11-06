import { FunctionComponent } from "react";
import Switch from "react-switch";
import { useTheme } from "styled-components";
import { shade } from "polished";
import {
  HeaderContainer,
  HeaderLogo,
  HeaderWrapper,
} from "../../styles/global";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme }) => {
  const { colors, title } = useTheme();

  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderLogo
          src="/static/logos/Logo Flat Transparente Preto.png"
          alt="Logo DFG Preto"
          onClick={() => navigate("/")}
        />
        <h3>Scoreboard</h3>
      </HeaderWrapper>
      <HeaderWrapper>
      </HeaderWrapper>
      <HeaderWrapper>
        <Switch
          onChange={toggleTheme}
          checked={title == "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={16}
          offColor={shade(0.15, colors.primary)}
          onColor={colors.secundary}
        ></Switch>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;

import { FunctionComponent } from "react";
import { Container } from "./styles";
import Switch from "react-switch";
import { useTheme } from "styled-components";
import { shade } from "polished";

interface HeaderProps {
  toggleTheme: () => void
}

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme }) => {
  const { colors, title } = useTheme();

  return (
    <Container>
      <h3>Dance Fit Scoreboard</h3>
      <Switch
        onChange={toggleTheme}
        checked={title == 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(0.15, colors.primary)}
        onColor={colors.secundary}
      ></Switch>
    </Container>
  );
};

export default Header;

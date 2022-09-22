import PanthaLogo from "./PanthaLogo";
import {
  Container,
  TopLeft,
  BottomLeft,
  BottomRight,
  Hamburger,
} from "./styles";
// import { VelvetBanana } from "./VelvetBanana";

export const  Overlay = () => {
  return (
    <Container>
      <TopLeft>
        <h1>
          THIRSTY
          <br />
          THURSDAY —
        </h1>
        <p>Twitter Space —</p>
      </TopLeft>
      <BottomLeft>
        Check out our main site at{" "}
        <a href="https://hellopantha.com">HelloPantha.com</a>
      </BottomLeft>
      <BottomRight>
        Come
        <br />
        Hang
        <br />
        With
        <br />
        Panthas
        <br />
      </BottomRight>
      <Hamburger>
        <div />
        <div />
        <div />
      </Hamburger>
      <PanthaLogo />
    </Container>
  );
}

export default Overlay;


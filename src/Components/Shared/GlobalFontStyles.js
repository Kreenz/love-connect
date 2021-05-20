import { createGlobalStyle } from "styled-components";
import PoppinsFont from "../../Assets/Fonts/Poppins/Poppins-ExtraLight.ttf";
import MontserratFont from "../../Assets/Fonts/montserrat/MontserratAlternates-ExtraLight.otf";

const FontStyles = createGlobalStyle`
  @fonft-face{
    font-family: "Montserrat";
    src:url('${MontserratFont}');
  }

  body{
      font-family: Verdana;
  }
`;

export default FontStyles;
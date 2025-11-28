import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      inputBackground: string;
      text: string;
      gray: string;
    };
  }
}

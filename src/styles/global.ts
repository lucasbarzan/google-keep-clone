import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-background: #FFFFFF;
    --color-primary: #ffba00;
    --color-primary-light: #feefc3;
    --color-text-base: #3c4043;
    --color-text-secondary: #80868b;
    --color-icon-base: #5f6368;
    --color-icon-secondary: #767676;
    --color-icon-light: #cccccc;

    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: var(--color-background);
    color: var(--color-text-base);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, span {
    font-family: 'Montserrat','Roboto','Arial',sans-serif;
    font-weight: 500;
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 700px) {
  :root {
    font-size: 62.5%;
  }
}
`;

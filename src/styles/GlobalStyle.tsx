import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root {
		font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		scrollbar-width: thin;
  		scrollbar-color: ${({ theme }) => theme.colors.gray} transparent;
	}

	button,
	input {
		border: 1px solid transparent;
		background: inherit;
		color: inherit;
		font-size: 1em;
		font-family: inherit;
		cursor: pointer;
	}

	a {
		text-decoration: inherit;
	}

	li {
		list-style: none;
	}
`;

export default GlobalStyle;

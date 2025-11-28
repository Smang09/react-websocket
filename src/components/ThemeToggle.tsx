import useThemeStore from "../store/theme";
import { MdOutlineLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import IconButton from "./common/IconButton";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <IconButton
      type="button"
      icon={theme === "light" ? MdOutlineLightMode : MdNightlight}
      label="색상 테마 변경"
      onClick={toggleTheme}
    />
  );
};

export default ThemeToggle;

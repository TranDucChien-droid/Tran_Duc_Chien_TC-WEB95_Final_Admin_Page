import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./themeSlice";
import type { AppDispatch, RootState } from "./index";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function useTheme() {
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return {
    theme,
    toggle: () => dispatch(toggleTheme()),
  };
}

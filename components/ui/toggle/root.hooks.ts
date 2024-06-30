import { useContext } from "react";

import { ToggleContext } from "./root";

export const useToggle = () => {
  return useContext(ToggleContext);
};

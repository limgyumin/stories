import { useContext } from "react";

import { DialogContext } from "./root";

export const useDialogContext = () => {
  return useContext(DialogContext);
};

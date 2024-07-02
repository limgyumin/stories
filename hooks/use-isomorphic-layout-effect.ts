import { useEffect, useLayoutEffect } from "react";

import { isClient } from "utils/is-client";

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

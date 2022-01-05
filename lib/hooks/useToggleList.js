import { useEffect, useState } from "react";
import useInnerWidth from "./useInnerWidth";

const useToggleList = () => {
  const { windowWidth } = useInnerWidth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (windowWidth >= 1440) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [windowWidth]);

  return { open, setOpen };
};

export default useToggleList;

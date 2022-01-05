import React, { useEffect, useState } from "react";

const useScroll = () => {
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    document.body.scrollTop > 350 || document.documentElement.scrollTop > 350
      ? setScrollY(true)
      : setScrollY(false);
  }

  return { scrollY };
};

export default useScroll;

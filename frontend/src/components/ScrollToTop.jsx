import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50); // delay to allow page content to render

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

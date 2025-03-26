import ArrowIcon from "../components/icons/ArrowIcon";
import { useState, useCallback, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    const scrolled =
      document.documentElement.scrollTop || document.body.scrollTop;
    const viewportHeight = window.innerHeight;

    if (scrolled > viewportHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 bg-white  rounded-full shadow-lg transition-opacity duration-300 z-50 hover:bg-secondary ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Zurück nach oben"
    >
      <div className="rotate-90">
        <ArrowIcon />
      </div>
    </button>
  );
};

export default BackToTopButton;

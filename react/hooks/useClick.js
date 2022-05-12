export const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    const current = element.current;
    if (typeof onClick !== "function") {
      return;
    }
    if (current) {
      current.addEventListener("click", onClick);
    }
    if (current) {
      return () => current.removeEventListener("click", onClick);
    }
  }, [onClick]);
  return element;
};

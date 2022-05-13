export const useBeforeLeave = (onBefore) => {
  useEffect(() => {
    if (typeof onBefore !== "function") {
      return;
    }
    document.addEventListener("mouseleave", onBefore);
    return () => document.removeEventListener("mouseleave", onBefore);
  }, [onBefore]);
};

export const useConfirm = (message = "", onConfirm, onCancel) => {
  if (typeof onConfirm !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else if (onCancel && typeof onCancel === "function") {
      onCancel();
    }
  };
  return confirmAction;
};

export const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currnetIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currnetIndex],
    changeItem: setCurrentIndex,
  };
};

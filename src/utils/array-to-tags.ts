export const convertArrayToTags = (array: string[]) => {
  const tags = array
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);

  return tags;
};

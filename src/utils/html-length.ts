export const getHTMLStringLength = (html: string) => {
  const plainText = html.replace(/<\/?[^>]+(>|$)/g, "").trim();

  return plainText.length;
};

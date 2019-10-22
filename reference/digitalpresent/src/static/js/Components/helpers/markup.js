import he from "he";

export const createMarkup = html => {
  const decoded = he.decode(html);
  return {
    __html: decoded
  };
};

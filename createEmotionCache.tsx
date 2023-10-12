import createCache from "@emotion/cache";

const createEmotionCache = () => {
  return createCache({
    key: "css",
    prepend: true,
    stylisPlugins: [
      /* your plugins here */
    ],
  });
};

export default createEmotionCache;

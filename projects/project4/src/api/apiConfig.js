const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "c4a482330972420f9bfd9f492d19a15d",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;

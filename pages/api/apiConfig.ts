const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "d29a76ce6b58ee5cface1d2a11323401",
    originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;

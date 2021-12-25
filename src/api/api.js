const axios = require("axios");

const getImages = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "23855124-9744a76c55c8d410f772c2e55",
    image_type: "photo",
    orientation: "horizontal",
  },
});

async function fetchImages(q = " ", page = 1, per_page = 12) {
  const params = { q, page, per_page };
  try {
    const { data } = await getImages("", {
      params,
    });
    return data;
  } catch (error) {
    console.error(`No results found for ${q}`);
  }
}

const api = { fetchImages };

export default api;

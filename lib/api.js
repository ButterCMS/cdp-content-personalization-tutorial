// ./lib/api.js

import Butter from "buttercms";

const APIKEY = process.env.BUTTER_READ_API_KEY;

const butter = Butter(APIKEY);

export const getLandingpage = async (slug) => {
  try {
    const page = await butter.page.retrieve("*", "landing-page");

    return page.data?.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getProducts = async ({
  params = { page: 1, page_size: 10 },
} = {}) => {
  try {
    const products = await butter.page.list(["product"], params);
    console.log({ products: products.data });
    return products.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const product = await butter.page.retrieve(["product"], slug);
    return product.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

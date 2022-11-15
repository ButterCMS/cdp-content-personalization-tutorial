// ./pages/index.js

import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import { getLandingpage, getProducts } from "../lib/api";
import { useUserDispatch, useUserState } from "../modules/AppContext";

export const getServerSideProps = async ({ params }) => {
  let data = await getLandingpage();
  let products = await getProducts();
  console.log({ data, products: products.data });
  return {
    props: { data, products: products.data },
  };
};

export default function Home({ data, products }) {
  const userState = useUserState();

  // get page hero data from from landing page data
  const {
    fields: { page_hero },
  } = data;

  // set hero data
  const [heroData, setHeroData] = useState(page_hero);

  // country type based on user's location,
  // for the page hero component
  const [heroCountryType, setHeroCountryType] = useState("");

  const [productsByCountry, setProductsByCountry] = useState(products);
  const [recommendedProducts, setRecommendedProducts] = useState(null);

  // function to filter products by country
  // by returning an array of products where the `available_in_country` field (an array)
  // contains an object with a `country_name` key with value == country
  const filterProductsByCountry = (country) =>
    products.filter((x) =>
      x.fields.available_in_country.find(
        (x) => x.country_name.toLowerCase() == country.toLowerCase()
      )
    );

  // function to get recommended products
  const getRecommendedProducts = async (id) => {
    try {
      const data = await (
        await fetch(`/api/getRecommendations?id=${id || "-1564477216"}`)
      ).json();

      // throw error if data includes an error field
      if (data.error) throw Error(data.error);

      // format data to correspond with ButerCMS product schema
      const productData = data.map((product) => ({
        slug: product.internal_id,
        fields: {
          name: product.title,
          image: product.image_big_url,
          price: product.price,
        },
      }));

      // save to state
      setRecommendedProducts(productData);

      return productData;
    } catch (error) {
      console.log({ error });
      return null;
    }
  };

  useEffect(() => {
    let country = userState.country;

    // if userState.country exists,
    if (country) {
      // set the heroCountryType to the user's country
      setHeroCountryType(country);

      // filter prducts by country where they are available
      let filteredProducts = filterProductsByCountry(country);

      // if no product matches the user country, return all products
      filteredProducts.length > 0
        ? setProductsByCountry(filteredProducts)
        : setProductsByCountry(products);
    }

    // get personyze user ID
    const personyzeUID = window.personyze?.uid;

    // fetch recommendations by personyze user id
    if (personyzeUID) getRecommendedProducts(personyzeUID);

    console.log({ products });
  }, [userState]);

  useEffect(() => {
    console.log({ recommendedProducts });
  });

  return (
    <main>
      <PageHero country={heroCountryType} data={heroData} />
      <section className="p-4">
        <div className="wrapper max-w-5xl m-auto">
          <header className="py-4">
            <h2 className="font-bold text-xl">
              Browse products availale in your region
            </h2>
          </header>
          <ul className="products grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsByCountry.map((product) => {
              return (
                <li key={product.slug} className="product">
                  <ProductCard product={product} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="p-4">
        <div className="wrapper max-w-5xl m-auto">
          <header className="py-4">
            <h2 className="font-bold text-xl">Browse recommended products</h2>
          </header>
          {recommendedProducts ? (
            <ul className="products grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedProducts.map((product) => (
                <li key={product.slug} className="product">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <span>Nothing here yet</span>
          )}
        </div>
      </section>
    </main>
  );
}

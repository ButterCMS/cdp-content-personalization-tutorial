// ./components/ProductCard.jsx

import Image from "next/image";
import Link from "next/link";
import { convertPrice } from "../lib/helpers";
import { useUserState } from "../modules/AppContext";
const ProductCard = ({ product }) => {
  const { slug, fields } = product;
  const userState = useUserState();

  // get country currency code from user data
  const currencyCode = userState?.country_code;

  console.log({ currencyCode });
  return (
    <>
      <article className="product-card p-4 bg-white rounded-lg">
        <div className="wrapper">
          <header>
            <div className="img-cont">
              <Image
                src={fields.image}
                width={400}
                height={400}
                alt="product"
              />
            </div>

            <h3> {fields.name} </h3>
            <p className="text-2xl">
              {
                // convert from US price to current country currency code e.g `NG`
                convertPrice(fields.price, { from: "US", to: currencyCode })
                  .result
              }
            </p>
            <Link
              href={{
                pathname: "/products/[slug]",
                query: { slug: slug },
              }}
            >
              <a>
                <button className="cta mt-4 !w-full">View product</button>
              </a>
            </Link>
          </header>
        </div>
      </article>
    </>
  );
};

export default ProductCard;

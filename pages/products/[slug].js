// ./pages/products/[slug].js

import Image from "next/image";
import { useEffect } from "react";
import { getProductBySlug } from "../../lib/api";
import { convertPrice } from "../../lib/helpers";
import { useUserState } from "../../modules/AppContext";

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  return {
    props: {
      product,
    },
  };
};

const Product = ({ product }) => {
  const {
    data: { fields },
  } = product;

  const userState = useUserState();

  const currencyCode = userState?.country_code;

  useEffect(() => {
    let viewedProduct = {
      slug: product.data.slug,
      ...fields,
    };

    console.log({ viewedProduct });
    window.analytics.track("Product Viewed", viewedProduct);

    // send prduct viewed event with product slug/id
    (self.personyze = self.personyze || []).push([
      "Product Viewed",
      product.data.slug,
    ]);

    // secondary events to personyze
    (self.personyze = self.personyze || []).push([
      "Interests",
      product.data.category,
    ]);
    (self.personyze = self.personyze || []).push([
      "Category",
      product.data.category,
    ]);
  }, []);

  return (
    <main>
      <section className="p-6">
        <div className="wrapper max-w-5xl m-auto">
          <header>
            <div className="wrapper grid lg:grid-cols-7 gap-4">
              <div className="col-span-4 img-cont">
                <Image
                  src={fields.image}
                  width={800}
                  height={800}
                  alt="product"
                />
              </div>
              <div className="details col-span-3 flex flex-col gap-4">
                <h1 className="text-3xl"> {fields.name} </h1>
                <p className="text-xl">{fields.description}</p>
                <p className="text-4xl">
                  {
                    // convert price to user currency
                    convertPrice(fields.price, { to: currencyCode }).result
                  }
                </p>
              </div>
            </div>
          </header>
          <article className="mt-4 bg-white rounded-xl p-6">
            <header className="border-b border-slate-800 py-4 mb-4">
              <h3 className="font-bold  ">Details</h3>
            </header>
            <div
              className="details prose max-w-none"
              dangerouslySetInnerHTML={{ __html: fields.details }}
            ></div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Product;

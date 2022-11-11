// ./pages/products/index.js

import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../lib/api";

export const getServerSideProps = async ({ params }) => {
  let products = await getProducts();
  return {
    props: { products: products.data },
  };
};

const Products = ({ products }) => {
  console.log({products});
  return (
    <main>
      <div className="wrapper max-w-5xl m-auto">
        <header className="my-6">
          <h1 className="text-2xl">All products</h1>
        </header>
        <ul className="products grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            return (
              <li key={product.slug} className="product">
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Products;

// ./components/SiteHeader.jsx

import Link from "next/link";

const SiteHeader = () => {
  return (
    <header className="sticky top-2 my-2 w-full  z-30">
      <div className="wrapper flex gap-6 justify-between p-4 bg-slate-100 max-w-4xl m-auto rounded-xl">
        <div className="logo">
          <Link href={"/"}>
            <a>
              <span className="font-black text-lg">iShop</span>
            </a>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href={"/products"}>
                <a>All products</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;

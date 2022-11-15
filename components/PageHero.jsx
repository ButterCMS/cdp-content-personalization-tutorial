// ./components/PageHero.jsx

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserState } from "../modules/AppContext";

const PageHero = ({ country, data }) => {
  const userState = useUserState();

  // set page hero data to state
  const [heroData, setHeroData] = useState(data[0].fields);
  console.log({ country });

  useEffect(() => {
    // set selectedHeroData to hero data whose type matches the user country
    let selectedHeroData = data.find((x) => x.type === country.toLowerCase());

    // set heroData to the default "all_countries" data if no match for the user country is not found
    setHeroData(selectedHeroData?.fields || data[0].fields);
  }, [country, data]);
  return (
    <section>
      <div className="wrapper">
        <header
          className="relative flex items-center p-6 h-screen max-h-[32rem] w-full bg-no-repeat bg-cover before:absolute before:w-full before:h-full before:bg-black before:bg-opacity-70 before:top-0 before:left-0"
          style={{
            backgroundImage: `url(${heroData.hero_image})`,
            backgroundPosition: "top center",
          }}
        >
          <div className="wrapper flex flex-col gap-2 text-white  z-10 w-full max-w-5xl m-auto">
            {userState.country && (
              <span>You are browsing from {userState.country} </span>
            )}
            <h1 className="text-4xl">{heroData.hero_caption}</h1>
            <p className="w-2/3">{heroData.hero_text}</p>
            <Link href={"/products"}>
              <button className="cta"> {heroData.button_label} </button>
            </Link>
          </div>
        </header>
      </div>
    </section>
  );
};

export default PageHero;

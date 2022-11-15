// ./pages/api/getRecommendations.js

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let headersList = {
  Accept: "*/*",
};

export default async function handler(req, res) {
  const { id } = req.query;

  console.log({ id });

  try {
    let response = await fetch(
      `https://pic.personyze.com/json/k=0ogbp3tufi7o/u=${id}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    res.status(400).json(error);
  }
}

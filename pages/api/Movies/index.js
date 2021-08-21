import { db } from "../../../firebase";
const handler = async (req, res) => {
  if (req.method === "POST") {
    await db
      .collection("MovieCollection")
      .doc("MovieList")
      .set({ movies: req.body.movies });
    res.status(200).json("Movies inserted!");
  }
};

export default handler;

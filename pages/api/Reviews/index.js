import { db } from "../../../firebase";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { movieId, nickname, gender, rating, comment } = req.body;

    await db.collection("MovieReviews").add({
      movieId: movieId,
      nickname: nickname,
      gender: gender,
      rating: rating,
      comment: comment,
    });
    res.status(200).json("Review has been published!");
  }
};

export default handler;

import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import ReviewList from "../../components/reviewList/ReviewList";
import classes from "./movieDetail.module.css";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import {
  DetailPosterAnimation,
  DetailTextAnimation,
  ReviewAnimation,
} from "../../Animation";
import ReviewForm from "../../components/reviewForm/ReviewForm";
const MovieDetail = (props) => {
  const [form, setForm] = useState(false);
  const router = useRouter();

  const ReviewSubmitHandler = async (data) => {
    if (window.confirm("Are you sure you want to submit it?")) {
      await db.collection("MovieReviews").add({
        movieId: props.movieData.id,
        nickname: data.nickname,
        gender: data.gender,
        rating: data.rating,
        comment: data.comment,
      });
      alert("Thank You For Submitting A Review!");
      router.push("/");
    } else {
      return false;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.topContainer}>
        <motion.div
          variants={DetailPosterAnimation}
          initial="hidden"
          animate="visible"
        >
          <img
            className={classes.poster}
            src={props.movieData.image}
            alt={props.movieData.title}
          />{" "}
        </motion.div>
        <motion.div
          variants={DetailTextAnimation}
          initial="hidden"
          animate="visible"
          className={classes.rightContent}
        >
          <h1 className={classes.title}>{props.movieData.title}</h1>
          <h3 className={classes.overview}>{props.movieData.overview}</h3>
          <hr className={classes.line} />
          <h4>{`Genres:    ${props.movieData.genre} `}</h4>
          <h4>{`Language:　${props.movieData.language}`}</h4>
          <h4>{`Released Date:　${props.movieData.released}`}</h4>
        </motion.div>
      </div>

      <motion.div
        variants={ReviewAnimation}
        initial="hidden"
        animate="visible"
        className={classes.reviewContainer}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "20px",
          }}
        >
          <h1> {form ? "Review Form" : " Reviews"}</h1>
          <Button
            onClick={() => {
              setForm(!form);
            }}
            color="default"
            style={{ height: "60px", width: "20%", marginTop: "15px" }}
          >
            {form ? "Go Back" : " Write a review"}
          </Button>
        </div>
        <div style={{ padding: "5%" }}>
          {" "}
          {form ? (
            <ReviewForm ReviewSubmitHandler={ReviewSubmitHandler} />
          ) : (
            <ReviewList reviews={props.reviews} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await db.collection("MovieCollection").doc("MovieList").get();
  const movies = await res.data().movies;
  const paths = movies.map((movie) => ({
    params: { movieId: movie.id.toString() },
  }));
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps = async (context) => {
  const movieId = context.params.movieId;
  const res = await db.collection("MovieCollection").doc("MovieList").get();
  const movies = await res.data().movies;
  const selectedMovie = movies.find((movie) => movie.id.toString() === movieId);
  // get language
  const api = process.env.NEXT_PUBLIC_APKEY;
  const languageRes = await fetch(
    `https://api.themoviedb.org/3/configuration/languages?${api}`
  );
  const languageData = await languageRes.json();
  const language = languageData.find(
    (language) => language.iso_639_1 === selectedMovie.original_language
  );
  // get genres
  const genresRes = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?${api}&language=en-US`
  );
  const genresData = await genresRes.json();

  const ids = selectedMovie.genre_ids;
  const genreNames = genresData.genres
    .filter((genre) => ids.includes(genre.id))
    .map((genre) => genre.name);
  // get the reviews
  const reviewData = await db.collection("MovieReviews").get();
  const allReviews = await reviewData.docs.map((doc) => ({
    id: doc.id,
    movieId: doc.data().movieId,
    nickname: doc.data().nickname,
    gender: doc.data().gender,
    rating: doc.data().rating,
    comment: doc.data().comment,
  }));
  const selectedReviews = allReviews.filter(
    (review) => review.movieId === selectedMovie.id
  );

  return {
    props: {
      movieData: {
        overview: selectedMovie.overview,
        released: selectedMovie.release_date,
        image: selectedMovie.poster_path
          ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
          : "http://www.movienewz.com/img/films/poster-holder.jpg",
        title: selectedMovie.title,
        language: language.english_name,
        genre: genreNames,
        id: selectedMovie.id,
      },
      reviews: selectedReviews,
    },
  };
};

export default MovieDetail;

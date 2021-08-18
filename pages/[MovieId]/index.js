import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import ReviewList from "../../components/ReviewList/ReviewList";
import classes from "./MovieDetail.module.css";
import { db } from "../../firebase";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
const MovieDetail = (props) => {
  const [form, setForm] = useState(false);
  const router = useRouter();
  console.log(props.selectedMovie);
  const ReviewSubmitHandler = (data) => {
    if (window.confirm("Are you sure you want to submit it?")) {
      alert(data.nickname);
      router.push("/");
    } else {
      return false;
    }
  };
  console.log(props.movieData.genre);
  return (
    <div className={classes.root}>
      <div className={classes.topContainer}>
        <div className={classes.leftContent}>
          <img
            className={classes.poster}
            src={props.movieData.image}
            alt={props.movieData.title}
          />
        </div>
        <div className={classes.rightContent}>
          <h1 className={classes.title}>{props.movieData.title}</h1>
          <h3>{props.movieData.overview}</h3>
          <hr className={classes.line} />
          <h4>
            {`Genres:    ${props.movieData.genre.map((genre) => genre)} `}
          </h4>
          <h4>{`Language:　${props.movieData.language}`}</h4>
          <h4>{`Released Date:　${props.movieData.released}`}</h4>
        </div>
      </div>

      <div className={classes.reviewContainer}>
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
            style={{ height: "60px", width: "20%" }}
          >
            {form ? "Go Back" : " Write a review"}
          </Button>
        </div>
        <div style={{ padding: "5%" }}>
          {" "}
          {form ? (
            <ReviewForm ReviewSubmitHandler={ReviewSubmitHandler} />
          ) : (
            <ReviewList />
          )}
        </div>
      </div>
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
  const api = "api_key=a192b273a2c1e46141694f43fc94d336";
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
      },
      selectedMovie: selectedMovie,
    },
  };
};

export default MovieDetail;

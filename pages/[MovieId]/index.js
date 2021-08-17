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
  console.log(router.query.MovieId);
  const ReviewSubmitHandler = (data) => {
    if (window.confirm("Are you sure you want to submit it?")) {
      alert(data.nickname);
      router.push("/");
    } else {
      return false;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.topContainer}>
        <div className={classes.leftContent}>
          <img src={props.movieData.image} alt={props.movieData.title} />
        </div>
        <div className={classes.rightContent}>
          <h1
            className={classes.title}
          >{`${props.movieData.title} / ${props.movieData.year}`}</h1>

          <h3>{props.movieData.plot}</h3>
          <hr className={classes.line} />
          <h4>{`IMDB Rating: 　★${props.movieData.imdbRating}`}</h4>
          <h4>{`Genre:　${props.movieData.genre}`}</h4>
          <h4>{`Language:　${props.movieData.language}`}</h4>
          <h4>{`Released Date:　${props.movieData.released}`}</h4>
          <h4>{`Duration:　${props.movieData.runtime}`}</h4>
          <h4>{`Country:　${props.movieData.country}`}</h4>
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
  const movieId = context.params.MovieId;
  const res = await db.collection("MovieCollection").doc("MovieList").get();
  const movies = await res.data().movies;
  const selectedMovie = movies.find((movie) => movie.id === movieId.toString());

  return {
    props: {
      movieData: {
        plot: "plot",
        released: "plot",
        actors: "plot",
        director: "plot",
        country: "plot",
        runtime: "plot",
        production: "plot",
        image:
          "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
        title: "plot",
        language: "plot",
        year: "plot",
        genre: "plot",
        imdbRating: "plot",
      },
      selectedMovie: selectedMovie,
    },
  };
};

export default MovieDetail;

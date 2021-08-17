import MovieList from "../components/MovieList/MovieList";
import classes from "../styles/home.module.css";
import { useState, useEffect } from "react";
const index = (props) => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className={classes.root}>
      <div className={classes.listContainer}>
        <h1 className={classes.title}> Movies Now Showing {`>`}</h1>
        <MovieList Movies={props.NowShowing} />
      </div>
      <div className={classes.listContainer}>
        <h1 className={classes.title}>Best Movies in {year} </h1>
        <MovieList Movies={props.Best} />
      </div>{" "}
      <div className={classes.listContainer}>
        <h1 className={classes.title}>Popular Movies {`>`}</h1>
        <MovieList Movies={props.Popular} />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const api = "api_key=a192b273a2c1e46141694f43fc94d336";
  const base = "https://api.themoviedb.org/3";
  const today = new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() < 10 ? `0${today.getMonth()}` : today.getMonth();
  const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  // fetch data for Movies Now Showing
  const NowShowingUrl = `${base}/discover/movie?primary_release_date.gte=${year}-${month}-${date}&primary_release_date.lte=${year}-${month}-${date}&${api}`;
  const NowShowingRes = await fetch(NowShowingUrl);
  const NowShowingData = await NowShowingRes.json();
  // fetch data for Best Movies of the year
  const BestUrl = `${base}/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&${api}`;
  const BestRes = await fetch(BestUrl);
  const BestData = await BestRes.json();
  // fetch data for Most Popular Movies
  const PopularUrl = `${base}/discover/movie?sort_by=popularity.desc&${api}`;
  const PopularRes = await fetch(PopularUrl);
  const PopularData = await PopularRes.json();
  return {
    props: {
      NowShowing: NowShowingData.results,
      Best: BestData.results,
      Popular: PopularData.results,
    },
  };
};

export default index;

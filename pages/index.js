import MovieList from "../components/MovieList/MovieList";
import classes from "../styles/home.module.css";
import { db } from "../firebase";
import { HomeAnimation } from "../Animation";
import { motion } from "framer-motion";
const index = (props) => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <motion.div
      variants={HomeAnimation}
      initial="hidden"
      animate="visible"
      className={classes.root}
    >
      <motion.div className={classes.listContainer}>
        <h1 className={classes.title}> Movies Now Showing {`>`}</h1>
        <MovieList Movies={props.NowShowing} />
      </motion.div>
      <motion.div className={classes.listContainer}>
        <h1 className={classes.title}>
          Best Movies in {year} {`>`}{" "}
        </h1>
        <MovieList Movies={props.Best} />
      </motion.div>{" "}
      <motion.div className={classes.listContainer}>
        <h1 className={classes.title}>Popular Movies {`>`}</h1>
        <MovieList Movies={props.Popular} />
      </motion.div>
    </motion.div>
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
  const NowShowingUrl = `${base}/movie/now_playing?${api}&language=en-US&page=1`;
  const NowShowingRes = await fetch(NowShowingUrl);
  const NowShowingData = await NowShowingRes.json();
  // fetch data for Best Movies of the year
  const BestUrl = `${base}/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&${api}`;
  const BestRes = await fetch(BestUrl);
  const BestData = await BestRes.json();
  // fetch data for Popular Movies
  const PopularUrl = `${base}/discover/movie?sort_by=popularity.desc&${api}`;
  const PopularRes = await fetch(PopularUrl);
  const PopularData = await PopularRes.json();
  // save data in the database
  const allMovies = [
    ...NowShowingData.results,
    ...BestData.results,
    ...PopularData.results,
  ];
  const res = await db.collection("MovieCollection").doc("MovieList");
  await res.set({ movies: allMovies });
  return {
    props: {
      NowShowing: NowShowingData.results,
      Best: BestData.results,
      Popular: PopularData.results,
    },
  };
};

export default index;

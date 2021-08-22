import MovieList from "../components/MovieList/MovieList";
import classes from "../styles/home.module.css";
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
        <h1 className={classes.title}>
          Best Movies in {year - 1} {`>`}
        </h1>
        <MovieList Movies={props.PrevBest} />
      </motion.div>
    </motion.div>
  );
};

export const getStaticProps = async () => {
  const api = process.env.NEXT_PUBLIC_APKEY;
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
  // fetch data for Best Movies of the previous year
  const PrevBestUrl = `${base}/discover/movie?primary_release_year=${
    year - 1
  }&sort_by=vote_average.desc&${api}`;
  const PrevBestRes = await fetch(PrevBestUrl);
  const PrevBestData = await PrevBestRes.json();
  // save data in the database
  const allMovies = [
    ...NowShowingData.results,
    ...BestData.results,
    ...PrevBestData.results,
  ];
  await fetch("/api/Movies", {
    method: "POST",
    body: JSON.stringify({ movies: allMovies }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    props: {
      NowShowing: NowShowingData.results,
      Best: BestData.results,
      PrevBest: PrevBestData.results,
    },
  };
};

export default index;

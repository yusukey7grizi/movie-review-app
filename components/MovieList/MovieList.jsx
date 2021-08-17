import MovieItem from "../MovieItem/MovieItem";
import classes from "./MovieList.module.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { IconButton } from "@material-ui/core";
import { useRef } from "react";

const MovieList = (props) => {
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={classes.root}>
      {" "}
      <div className={classes.container} ref={ref}>
        {props.Movies.map((Movie) => (
          <MovieItem
            key={Movie.id}
            id={Movie.id}
            title={Movie.title}
            image={
              Movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${Movie.poster_path}`
                : "http://www.movienewz.com/img/films/poster-holder.jpg"
            }
          />
        ))}{" "}
      </div>{" "}
      <div className={classes.buttonContainer}>
        {" "}
        <IconButton
          onClick={() => scroll(-500)}
          style={{ width: "30px", height: "30px" }}
        >
          <ChevronLeftIcon className={classes.icon} />
        </IconButton>
        <IconButton
          onClick={() => scroll(500)}
          style={{ width: "30px", height: "30px" }}
        >
          <ChevronRightIcon className={classes.icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default MovieList;

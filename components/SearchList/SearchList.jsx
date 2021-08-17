import MovieItem from "../MovieItem/MovieItem";
import classes from "./SearchList.module.css";

const SearchList = (props) => {
  return (
    <div className={classes.root}>
      {props.filteredMovies.map((movie) => (
        <MovieItem
          title={movie.title}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "http://www.movienewz.com/img/films/poster-holder.jpg"
          }
        />
      ))}
    </div>
  );
};

export default SearchList;

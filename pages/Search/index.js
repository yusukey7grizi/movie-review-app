import { TextField } from "@material-ui/core";
import SearchList from "../../components/SearchList/SearchList";
import { db } from "../../firebase";
import classes from "./Search.module.css";
import { useState } from "react";
const index = (props) => {
  const [TextInput, setTextInput] = useState("");
  const filteredMovies = props.allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(TextInput.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <TextField
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
          value={TextInput}
          id="standard-basic"
          label="Search"
          className={classes.searchInput}
          InputLabelProps={{
            style: {
              width: 400,
            },
          }}
          inputProps={{
            maxLength: 50,
            style: {
              width: 400,
            },
          }}
        />
      </div>
      <div>
        {" "}
        <SearchList filteredMovies={filteredMovies} />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await db.collection("MovieCollection").doc("MovieList");
  const data = await res.get();
  const movies = data.data().movies;
  return {
    props: {
      allMovies: movies,
    },
  };
};

export default index;

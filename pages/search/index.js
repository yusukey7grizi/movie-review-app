import { TextField } from "@material-ui/core";
import SearchList from "../../components/searchList/SearchList";
import { db } from "../../firebase";
import classes from "./search.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { SearchAnimation } from "../../Animation";
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
          inputProps={{
            maxLength: 50,
          }}
        />
      </div>
      <motion.div variants={SearchAnimation} initial="hidden" animate="visible">
        {" "}
        <SearchList filteredMovies={filteredMovies} />
      </motion.div>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await db.collection("MovieCollection").doc("MovieList").get();
  const movies = data.data().movies;
  return {
    props: {
      allMovies: movies,
    },
  };
};

export default index;

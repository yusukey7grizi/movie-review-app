import { TextField } from "@material-ui/core";
import SearchList from "../../components/SearchList/SearchList";
import classes from "./Search.module.css";

const index = () => {
  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <TextField
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
        <SearchList />
      </div>
    </div>
  );
};

export default index;

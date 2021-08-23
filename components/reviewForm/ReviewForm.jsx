import Grid from "@material-ui/core/Grid";
import { InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Select } from "@material-ui/core";
import classes from ".//reviewForm.module.css";
import { useForm } from "react-hook-form";
const ReviewForm = (props) => {
  const height = 80;
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(props.ReviewSubmitHandler)}>
      <Grid className={classes.container}>
        <Grid className={classes.inputContainer}>
          <TextField
            inputProps={{ maxLength: 10 }}
            {...register("nickname")}
            required
            id="nickname"
            name="nickname"
            label="Nickname"
            fullWidth
          />
        </Grid>
        <Grid className={classes.inputContainer}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            {...register("gender")}
            style={{ width: "100%", textAlign: "center" }}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </Grid>{" "}
        <Grid className={classes.inputContainer}>
          <InputLabel id="demo-simple-select-label">Rating</InputLabel>
          <Select
            {...register("rating")}
            style={{ width: "100%", textAlign: "center" }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </Grid>
        <Grid className={classes.inputContainer}>
          <TextField
            {...register("comment")}
            required
            id="comment"
            name="comment"
            label="Comment"
            multiline
            fullWidth
            InputLabelProps={{
              style: {
                height,
              },
            }}
            inputProps={{
              maxLength: 100,
              minLength: 10,
              style: {
                height,
                padding: "0 14px",
              },
            }}
          />
        </Grid>
        <Button type="submit">Submit</Button>
      </Grid>
    </form>
  );
};
export default ReviewForm;

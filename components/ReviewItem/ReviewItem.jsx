import classes from "./ReviewItem.module.css";
const ReviewItem = (props) => {
  var stars = [];
  for (var i = 0; i < props.rating; i++) {
    stars.push(<span>★</span>);
  }
  const Icon =
    props.gender === "male"
      ? "data:image/png;base64,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"
      : "data:image/png;base64,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";
  return (
    <div className={classes.root}>
      <img className={classes.icon} src={Icon} alt={props.nickname} />
      <div className={classes.box16}>
        <div className={classes.nameRating}>
          <img className={classes.hiddenIcon} src={Icon} alt={props.nickname} />
          <h3>{props.nickname}</h3>
          <h3 className={classes.stars}>{stars}</h3>
        </div>
        <p className={classes.comment}>{props.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;

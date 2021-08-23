import ReviewItem from "../reviewItem/ReviewItem";
import classes from ".//reviewList.module.css";

const ReviewList = (props) => {
  return (
    <div className={classes.reviewList}>
      {props.reviews.length === 0 ? (
        <h1 className={classes.text}>No reviews have been published yet</h1>
      ) : (
        props.reviews.map((review) => (
          <ReviewItem
            key={review.id}
            comment={review.comment}
            rating={review.rating}
            gender={review.gender}
            nickname={review.nickname}
          />
        ))
      )}
    </div>
  );
};

export default ReviewList;

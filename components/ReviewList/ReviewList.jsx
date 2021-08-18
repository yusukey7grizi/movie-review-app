import ReviewItem from "../ReviewItem/ReviewItem";
import classes from "./ReviewList.module.css";
const ReviewList = (props) => {
  return (
    <div className={classes.reviewList}>
      {props.reviews.map((review) => (
        <ReviewItem
          key={review.id}
          comment={review.comment}
          rating={review.rating}
          gender={review.gender}
          nickname={review.nickname}
        />
      ))}
    </div>
  );
};

export default ReviewList;

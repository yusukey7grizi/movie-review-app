import React from "react";
import ReviewItem from "../ReviewItem/ReviewItem";
import classes from "./ReviewList.module.css";
const ReviewList = () => {
  return (
    <div className={classes.reviewList}>
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
    </div>
  );
};

export default ReviewList;

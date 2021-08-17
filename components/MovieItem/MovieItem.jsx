import React from "react";
import { motion } from "framer-motion";
import classes from "./MovieItem.module.css";
import { useRouter } from "next/router";
const MovieItem = (props) => {
  const router = useRouter();
  return (
    <div className={classes.container}>
      <motion.img
        onClick={() => {
          router.push(`/${props.id}`);
        }}
        whileHover={{ scale: 1.1, opacity: 0.6 }}
        className={classes.image}
        src={props.image}
        alt={props.title}
      />
    </div>
  );
};

export default MovieItem;

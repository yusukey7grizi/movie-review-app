import { motion } from "framer-motion";
import classes from "./movieItem.module.css";
import { useRouter } from "next/router";
const MovieItem = (props) => {
  const router = useRouter();
  return (
    <div className={classes.container}>
      <motion.img
        onClick={() => {
          router.push({
            pathname: `/${props.id}`,
            query: { movieId: props.id },
          });
        }}
        whileHover={{ scale: 1.1, opacity: 0.6 }}
        className={classes.image}
        src={props.image}
        alt={props.title}
      />
      <h5 className={classes.text}>{props.title}</h5>
    </div>
  );
};

export default MovieItem;

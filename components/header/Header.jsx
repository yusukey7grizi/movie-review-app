import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: " 'Limelight', cursive",
  },
}));
const Header = () => {
  const classes = useStyles();

  return (
    <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}>
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: "black",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <IconButton>
              <Typography style={{ color: "white", marginRight: "20px" }}>
                Movie App
              </Typography>
              <LocalMoviesIcon style={{ color: "white" }} />
            </IconButton>
          </Link>
          <Link href="/Search">
            <IconButton>
              <Typography style={{ color: "white", marginRight: "20px" }}>
                Search
              </Typography>
              <SearchIcon style={{ color: "white" }} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;

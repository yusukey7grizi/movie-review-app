import Header from "../header/Header";

const Layout = (props) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;

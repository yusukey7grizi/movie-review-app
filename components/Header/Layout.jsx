import Header from "./header";

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

const Layout = ({ children, meta }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h1>{meta.title}</h1>
      <article>{children}</article>
    </div>
  );
};

export default Layout;

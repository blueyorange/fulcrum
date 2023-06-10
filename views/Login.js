import Base from "./Base.js";

const Login = () => {
  return Base(
    { title: "Home" },
    `<header>
        <h1>Welcome to Fulcrum</h1>
      </header>
      <main>
        <a href="/auth/google">Sign in with Google</a>
      </main>`
  );
};

export default Login;

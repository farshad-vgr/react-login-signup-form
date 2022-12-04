import React, { useReducer, useRef, useState } from "react";
import "./App.css";

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

function loginReducer(state, { type, fieldName, payload }) {
  switch (type) {
    case "field": {
      return {
        ...state,
        [fieldName]: payload,
      };
    }
    case "login": {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case "success": {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: "Incorrect username or password!",
        isLoggedIn: false,
        isLoading: false,
      };
    }
    case "logOut": {
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: "",
      };
    }
    default:
      throw new Error("Error in reducer case: " + type);
  }
}

function App() {
  const mainContainer = useRef();
  const signinContainer = useRef();
  const userNameRefLogin = useRef();
  const passwordRefLogin = useRef();
  const userNameRefSignin = useRef();
  const passwordRefSignin = useRef();
  const [ display, setDisplay ] = useState({ loginDisplay: "block", signinDisplay: "none" });
  const { loginDisplay, signinDisplay } = display;
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    setTimeout(() => {
      if (username.trim() === "ejiro" && password.trim() === "1234") {
        dispatch({ type: "success" });
      } else if (username.trim() === "") {
        dispatch({ type: "error" });
        userNameRefLogin.current.innerText = "Enter your name!";
      } else if (password.trim() === "") {
        dispatch({ type: "error" });
        userNameRefLogin.current.innerText = "";
        passwordRefLogin.current.innerText = "Enter your password!";
      } else {
        dispatch({ type: "error" });
        userNameRefLogin.current.innerText = "";
        passwordRefLogin.current.innerText = "";
        alert(`${error}`);
      }
    }, 1000);
  };

  const onRegister = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    setTimeout(() => {
      if (username.trim() === "") {
        dispatch({ type: "error" });
        userNameRefSignin.current.innerText = "Enter your name!";
      } else if (password.trim() === "") {
        dispatch({ type: "error" });
        userNameRefSignin.current.innerText = "";
        passwordRefSignin.current.innerText = "Enter your password!";
      } else {
        dispatch({ type: "success" });
        userNameRefSignin.current.innerText = "";
        passwordRefSignin.current.innerText = "";
      }
    }, 1000);
  };

  return (
    <main ref={mainContainer} className="container">
      <section className="login-container" style={{ display: loginDisplay }}>
        {isLoggedIn ? (
          <article className="logout">
            <h2>Welcome {username}!</h2>
            <button
              className="logout-btn"
              onClick={() => {
                dispatch({ type: "logOut" });
                setDisplay({ loginDisplay: "block", signinDisplay: "none" });
              }}>
              Log Out
            </button>
          </article>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <h1>Login form:</h1>
            <section>
              <input
                type="text"
                placeholder="Name"
                minLength={3}
                maxLength={15}
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "username",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <small ref={userNameRefLogin}></small>
            </section>
            <section>
              <input
                type="password"
                placeholder="Password"
                minLength={4}
                maxLength={15}
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <small ref={passwordRefLogin}></small>
            </section>
            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <section className="login-options">
              <span>Forgot password?</span>
              <span
                onClick={() => {
                  mainContainer.current.className = "container flip";
                  signinContainer.current.className = "signin-container flip";
                  setTimeout(() => {
                    setDisplay({ loginDisplay: "none", signinDisplay: "block" });
                  }, 300);
                }}>
                Sign in?
              </span>
            </section>
          </form>
        )}
      </section>

      <section ref={signinContainer} className="signin-container" style={{ display: signinDisplay }}>
        {isLoggedIn ? (
          <article className="logout">
            <h2>Registered {username}!</h2>
            <button
              className="logout-btn"
              onClick={() => {
                mainContainer.current.className = "container";
                signinContainer.current.className = "signin-container";
                setTimeout(() => {
                  dispatch({ type: "logOut" });
                  setDisplay({ loginDisplay: "block", signinDisplay: "none" });
                }, 300);
              }}>
              Log Out
            </button>
          </article>
        ) : (
          <form className="form" onSubmit={onRegister}>
            <h1>Signin form:</h1>
            <section>
              <input
                type="text"
                placeholder="Name"
                minLength={3}
                maxLength={15}
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "username",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <small ref={userNameRefSignin}></small>
            </section>
            <section>
              <input
                type="password"
                placeholder="Password"
                minLength={4}
                maxLength={15}
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <small ref={passwordRefSignin}></small>
            </section>
            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Signning in..." : "Sign In"}
            </button>
            <section className="login-options">
              <span>Have account?</span>
              <span
                onClick={() => {
                  mainContainer.current.className = "container";
                  signinContainer.current.className = "signin-container";
                  setTimeout(() => {
                    setDisplay({ loginDisplay: "block", signinDisplay: "none" });
                  }, 300);
                }}>
                Log in?
              </span>
            </section>
          </form>
        )}
      </section>
    </main>
  );
}

export default App;

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
    case "clearInputs": {
      return {
        ...state,
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
  const signupContainer = useRef();
  const userNameRefLogin = useRef();
  const passwordRefLogin = useRef();
  const userNameRefSignup = useRef();
  const passwordRefSignup = useRef();
  const passwordInputLogin = useRef();
  const eyeBtnLogin = useRef();
  const passwordInputSignup = useRef();
  const eyeBtnSignup = useRef();
  const [display, setDisplay] = useState({ loginDisplay: "block", signupDisplay: "none" });
  const { loginDisplay, signupDisplay } = display;
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = (e) => {
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

  const onRegister = (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    setTimeout(() => {
      if (username.trim() === "") {
        dispatch({ type: "error" });
        userNameRefSignup.current.innerText = "Enter your name!";
      } else if (password.trim() === "") {
        dispatch({ type: "error" });
        userNameRefSignup.current.innerText = "";
        passwordRefSignup.current.innerText = "Enter your password!";
      } else {
        dispatch({ type: "success" });
        userNameRefSignup.current.innerText = "";
        passwordRefSignup.current.innerText = "";
      }
    }, 1000);
  };

  const showPasswordHandler = (input, button) => {
    if (input.current.type === "password") {
      input.current.type = "text";
      button.current.classList.add("hide");
    } else {
      input.current.type = "password";
      button.current.classList.remove("hide");
    }
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
                setDisplay({ loginDisplay: "block", signupDisplay: "none" });
              }}>
              Log Out
            </button>
          </article>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <h1>Login form:</h1>
            <section>
              <div className="content">
                <div className="pencil">
                  <div className="fa fa-pencil-alt flip"></div>
                </div>

                <input
                  required
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
              </div>
              <small ref={userNameRefLogin}></small>
            </section>
            <section>
              <div className="content">
                <div className="lock">
                  <div className="fa fa-lock"></div>
                </div>

                <input
                  required
                  ref={passwordInputLogin}
                  type="password"
                  placeholder="Password"
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

                <span className="show-hide">
                  <i ref={eyeBtnLogin} id="show" className="fa fa-eye" onClick={() => showPasswordHandler(passwordInputLogin, eyeBtnLogin)}></i>
                </span>
              </div>
              <small ref={passwordRefLogin}></small>
            </section>
            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <section className="login-options">
              <span>Forgot password?</span>
              <span
                onClick={() => {
                  mainContainer.current.classList.add("flip");
                  signupContainer.current.classList.add("flip");
                  setTimeout(() => {
                    setDisplay({ loginDisplay: "none", signupDisplay: "block" });
                  }, 300);
                  userNameRefLogin.current.innerText = "";
                  passwordRefLogin.current.innerText = "";
                  dispatch({ type: "clearInputs" });
                }}>
                Sign up?
              </span>
            </section>
          </form>
        )}
      </section>

      <section ref={signupContainer} className="signup-container" style={{ display: signupDisplay }}>
        {isLoggedIn ? (
          <article className="logout">
            <h2>Registered {username}!</h2>
            <button
              className="logout-btn"
              onClick={() => {
                mainContainer.current.classList.remove("flip");
                signupContainer.current.classList.remove("flip");
                setTimeout(() => {
                  dispatch({ type: "logOut" });
                  setDisplay({ loginDisplay: "block", signupDisplay: "none" });
                }, 300);
              }}>
              Log Out
            </button>
          </article>
        ) : (
          <form className="form" onSubmit={onRegister}>
            <h1>Signup form:</h1>
            <section>
              <div className="content">
                <div className="pencil">
                  <div className="fa fa-pencil-alt flip"></div>
                </div>

                <input
                  required
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
              </div>
              <small ref={userNameRefSignup}></small>
            </section>
            <section>
              <div className="content">
                <div className="lock">
                  <div className="fa fa-lock"></div>
                </div>

                <input
                  required
                  ref={passwordInputSignup}
                  type="password"
                  placeholder="Password"
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
                <span className="show-hide">
                  <i ref={eyeBtnSignup} id="show" className="fa fa-eye" onClick={() => showPasswordHandler(passwordInputSignup, eyeBtnSignup)}></i>
                </span>
              </div>
              <small ref={passwordRefSignup}></small>
            </section>
            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Signning up..." : "Sign Up"}
            </button>
            <section className="login-options">
              <span>Have account?</span>
              <span
                onClick={() => {
                  mainContainer.current.classList.remove("flip");
                  signupContainer.current.classList.remove("flip");
                  setTimeout(() => {
                    setDisplay({ loginDisplay: "block", signupDisplay: "none" });
                  }, 300);
                  userNameRefSignup.current.innerText = "";
                  passwordRefSignup.current.innerText = "";
                  dispatch({ type: "clearInputs" });
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

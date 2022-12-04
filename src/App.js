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
  const signinContainer = useRef();
  const userNameRefLogin = useRef();
  const passwordRefLogin = useRef();
  const userNameRefSignin = useRef();
  const passwordRefSignin = useRef();
  const passwordInputLogin = useRef();
  const eyeBtnLogin = useRef();
  const passwordInputSignin = useRef();
  const eyeBtnSignin = useRef();
  const [display, setDisplay] = useState({ loginDisplay: "block", signinDisplay: "none" });
  const { loginDisplay, signinDisplay } = display;
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
                setDisplay({ loginDisplay: "block", signinDisplay: "none" });
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
                  signinContainer.current.classList.add("flip");
                  setTimeout(() => {
                    setDisplay({ loginDisplay: "none", signinDisplay: "block" });
                  }, 300);
                  userNameRefLogin.current.innerText = "";
                  passwordRefLogin.current.innerText = "";
                  dispatch({ type: "clearInputs" });
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
                mainContainer.current.classList.remove("flip");
                signinContainer.current.classList.remove("flip");
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
              <small ref={userNameRefSignin}></small>
            </section>
            <section>
              <div className="content">
                <div className="lock">
                  <div className="fa fa-lock"></div>
                </div>

                <input
                  required
                  ref={passwordInputSignin}
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
                  <i ref={eyeBtnSignin} id="show" className="fa fa-eye" onClick={() => showPasswordHandler(passwordInputSignin, eyeBtnSignin)}></i>
                </span>
              </div>
              <small ref={passwordRefSignin}></small>
            </section>
            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Signning in..." : "Sign In"}
            </button>
            <section className="login-options">
              <span>Have account?</span>
              <span
                onClick={() => {
                  mainContainer.current.classList.remove("flip");
                  signinContainer.current.classList.remove("flip");
                  setTimeout(() => {
                    setDisplay({ loginDisplay: "block", signinDisplay: "none" });
                  }, 300);
                  userNameRefSignin.current.innerText = "";
                  passwordRefSignin.current.innerText = "";
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

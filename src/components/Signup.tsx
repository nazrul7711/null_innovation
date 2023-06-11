import style from "./Signup.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthActions } from "../store/AuthSlice";

function Signup() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();
  function toggleHandler() {
    setToggle((a) => !a);
  }
  function loginHandler() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        if (userAuth) {
          dispatch(
            AuthActions.login({
              email: userAuth.user.email!,
            })
          );
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  function registerHandler() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        if (userAuth) {
          dispatch(
            AuthActions.login({
              email: userAuth.user.email!,
            })
          );
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  console.log(user.user);
  return (
    <>
      <div className={style.form}>
        <h1>{toggle ? "Sign Up" : "Sign In"}</h1>
        <label htmlFor="">Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={toggle ?  registerHandler:loginHandler}>
          {toggle ? "Register" : "Login"}
        </button>

        <p>
          {toggle ? "Already Have an Account " : "Dont have an Account "}
          <a href="#" onClick={toggleHandler}>
            {toggle ? "login" : "register"}
          </a>
        </p>
      </div>
    </>
  );
}

export default Signup;

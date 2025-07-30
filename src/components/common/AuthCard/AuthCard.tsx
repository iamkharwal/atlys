/** @format */

import * as React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { isStringValid } from "../../../utils";
import { UserType } from "../../../types";
import { toast } from "react-toastify";

type AuthCardProps = {};

export function AuthCard(props: AuthCardProps) {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isSignIn, setIsSignIn] = React.useState(false);
  const [form, setForm] = React.useState({
    username: {
      input: "",
      err: null,
    },
    email: {
      input: "",
      err: null,
    },
    password: {
      input: "",
      err: null,
    },
  });

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function validate() {
    const formState = JSON.parse(JSON.stringify(form));
    if (
      !isStringValid(formState.email.input) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formState.email.input
      )
    ) {
      formState.email.err = "Invalid email!";
    }

    if (!isStringValid(form.password.input) || form.password.input.length < 3) {
      formState.password.err = "Invalid password! Min length of password is 3";
    }

    if (isSignIn && !isStringValid(formState.username.input)) {
      formState.username.err = "Invalid username";
    }

    setForm(formState);
    return Object.keys(formState).reduce(
      (prev, key) => prev && !formState[key].err,
      true
    );
  }

  function handleSubmit() {
    if (validate()) {
      const usersLoc = localStorage.getItem("user");
      const users: (UserType & { password: string })[] = isStringValid(usersLoc)
        ? JSON.parse(usersLoc as string)
        : [];

      // if user is signing in
      if (isSignIn) {
        const isUserUnique =
          users.filter((user) => user.email === form.email.input).length ===
            0 &&
          users.filter((user) => user.username === form.username.input)
            .length === 0;

        if (isUserUnique) {
          const currUser: UserType = {
            email: form.email.input,
            username: form.username.input,
          };
          users.push({
            ...currUser,
            password: form.password.input,
          });
          localStorage.setItem("user", JSON.stringify(users));
          localStorage.setItem("profile", JSON.stringify(currUser));
          navigate("/");
        } else {
          toast.error("Username or Email is already registered!");
        }
      }
      // if user is logging in
      else {
        const currUser = users.filter(
          (user) => user.email === form.email.input
        );
        // if this user has signed up
        if (currUser.length > 0) {
          // if passwords match
          if (currUser[0].password === form.password.input) {
            localStorage.setItem("profile", JSON.stringify(currUser[0]));
            navigate("/");
          } else {
            toast.error("Wrong password");
          }
        } else
          toast.error(
            "No user found with this email! Please create a new user"
          );
      }
    }
  }

  React.useEffect(() => {
    const usersLoc = localStorage.getItem("user");
    const users: (UserType & { password: string })[] = isStringValid(usersLoc)
      ? JSON.parse(usersLoc as string)
      : [];

    const demoUsers = [
      { username: "demo", email: "demo@example.com", password: "password123" },
      { username: "testuser", email: "test@user.com", password: "testpass" },
    ];

    let updated = false;

    demoUsers.forEach((demo) => {
      const alreadyExists = users.some(
        (u) => u.email === demo.email || u.username === demo.username
      );
      if (!alreadyExists) {
        users.push(demo);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem("user", JSON.stringify(users));
    }
  }, []);

  return (
    <div className="w-[100%] sm:w-[500px]  max-w-[600px] bg-white border-[2px] border-[#d1d1d1] p-4 sm:p-6 rounded-[8px] text-center mx-auto">
      <p className="text-[14px] font-[500] text-[#7a7a7a] mb-[6px] capitalize">
        {isSignIn ? "SIGN UP" : "WELCOME BACK"}
      </p>
      <p className="text-[18px] font-[600] text-[#1e1e1e]">
        {isSignIn ? "Create an account to continue" : "Log into your account"}
      </p>

      <div className="flex flex-col w-full gap-[16px] mt-[36px] text-left">
        {/* Email or Username Input */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-[14px] font-[400] text-[#4a4a4a] mb-[4px]"
          >
            Email or Username
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email or username"
            className={`w-full p-[8px] bg-white border-[1.5px] ${
              isStringValid(form.email.err)
                ? "border-red-600"
                : "border-[#dcdcdc]"
            } rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-[16px] text-black placeholder-[#a0a0a0]`}
            onChange={(e) =>
              setForm({ ...form, email: { input: e.target.value, err: null } })
            }
          />
          <p className="text-[14px] font-[500] text-red-600 mt-[2px] px-[4px]">
            {form.email.err}
          </p>
        </div>

        {/* Username */}
        {isSignIn && (
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-[14px] font-[400] text-[#4a4a4a] mb-[4px]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a preferred username"
              className={`w-full p-[8px] bg-white border-[1.5px] ${
                isStringValid(form.username.err)
                  ? "border-red-600"
                  : "border-[#dcdcdc]"
              } rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-[16px] text-black placeholder-[#a0a0a0]`}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: { input: e.target.value, err: null },
                })
              }
            />
            <p className="text-[14px] font-[500] text-red-600 mt-[2px] px-[4px]">
              {form.username.err}
            </p>
          </div>
        )}

        {/* Password Input */}
        <div className="flex flex-col relative">
          <div className="flex items-center justify-between mb-[4px]">
            <label
              htmlFor="password"
              className="text-[14px] font-[400] text-[#4a4a4a]"
            >
              Password
            </label>

            {!isSignIn && (
              <div
                className="text-right"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                <p className="text-[12px] text-[#4a4a4a] font-[500] hover:underline cursor-pointer">
                  Forgot password?
                </p>
              </div>
            )}
          </div>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            className={`w-full p-[8px] bg-white border-[1.5px] ${
              isStringValid(form.password.err)
                ? "border-red-600"
                : "border-[#dcdcdc]"
            } rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-[16px] text-black placeholder-[#a0a0a0]`}
            onChange={(e) =>
              setForm({
                ...form,
                password: { input: e.target.value, err: null },
              })
            }
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-[8px] top-[35px] text-[#888] hover:text-black"
          >
            {passwordVisible ? (
              <FiEye style={{ width: "20px", height: "20px" }} />
            ) : (
              <FiEyeOff style={{ width: "20px", height: "20px" }} />
            )}
          </button>
          <p className="text-[14px] font-[500] text-red-600 mt-[2px] px-[4px]">
            {form.password.err}
          </p>
        </div>

        {/* Submit button */}
        <div className="w-full">
          <button
            onClick={handleSubmit}
            className="bg-[#4A96FF] p-[10px] rounded-[4px] text-[16px] text-white w-full cursor-pointer active:bg-[#2b83fc]"
          >
            {isSignIn ? "Continue" : "Log in"}
          </button>
          <div className="text-[14px] font-[500] mt-[6px] text-center">
            <span className="text-[#7F8084]">
              {isSignIn ? "Already have an account?" : "Not registered yet?"}
            </span>
            <span
              className="text-[#1a1a1a] ml-[4px] cursor-pointer font-semibold hover:underline"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Login →" : "Register →"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

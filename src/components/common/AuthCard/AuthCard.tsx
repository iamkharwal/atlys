/** @format */

import * as React from "react";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { isStringValid } from "../../../utils";
import { UserType } from "../../../types";
import { toast } from "react-toastify";
import s from "./AuthCard.module.css";

type AuthCardProps = {};

const demoUsers = [
  { username: "demo", email: "demo@example.com", password: "password123" },
  { username: "testuser", email: "test@user.com", password: "testpass" },
];


export function AuthCard(props: AuthCardProps) {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [form, setForm] = React.useState({
    identifier: { input: "", err: null as string | null },
    email: { input: "", err: null as string | null },
    username: { input: "", err: null as string | null },
    password: { input: "", err: null as string | null },
  });

  function togglePasswordVisibility() {
    setPasswordVisible((v) => !v);
  }

  function validate() {
    const f = JSON.parse(JSON.stringify(form)) as typeof form;

    if (isSignUp) {
      // Email (required)
      const email = f.email.input.trim();
      if (!isStringValid(email)) {
        f.email.err = "Email is required";
      } else {
        const ok = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          email
        );
        if (!ok) f.email.err = "Enter a valid email";
      }

      // Username (required)
      if (!isStringValid(f.username.input.trim())) {
        f.username.err = "Username is required";
      }

      if (!isStringValid(f.password.input) || f.password.input.length < 3) {
        f.password.err = "Invalid password! Min length is 3";
      }

      setForm(f);
      return [f.email.err, f.username.err, f.password.err].every(
        (item) => !item
      );
    } else {
      // Identifier: email or username
      const id = f.identifier.input.trim();
      if (!isStringValid(id)) {
        f.identifier.err = "Please enter email or username";
      } else if (id.includes("@")) {
        const ok = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(id);
        if (!ok) f.identifier.err = "Enter a valid email";
      }
    }

    if (!isStringValid(f.password.input) || f.password.input.length < 3) {
      f.password.err = "Invalid password! Min length is 3";
    }

    setForm(f);
    return [f.password.err, f.identifier.err].every((item) => !item);
  }

  function handleSubmit() {
    if (!validate()) return;

    const usersLoc = localStorage.getItem("user");
    const users: (UserType & { password: string })[] = isStringValid(usersLoc)
      ? JSON.parse(usersLoc as string)
      : [];

    if (isSignUp) {
      const emailExists = users.some(
        (u) => u.email === form.email.input.trim()
      );
      const usernameExists = users.some(
        (u) => u.username === form.username.input.trim()
      );

      if (emailExists || usernameExists) {
        toast.error("Username or Email is already registered!");
        return;
      }

      const newUser: UserType & { password: string } = {
        email: form.email.input.trim(),
        username: form.username.input.trim(),
        password: form.password.input,
      };

      users.push(newUser);
      localStorage.setItem("user", JSON.stringify(users));
      localStorage.setItem(
        "profile",
        JSON.stringify({ email: newUser.email, username: newUser.username })
      );
      navigate("/");
    } else {
      const id = form.identifier.input.trim();
      const match = users.find((u) => u.email === id || u.username === id);

      if (!match) {
        toast.error("No user found! Please sign up first.");
        return;
      }

      if (match.password !== form.password.input) {
        toast.error("Wrong password");
        return;
      }

      localStorage.setItem(
        "profile",
        JSON.stringify({
          email: match.email,
          username: match.username,
        } as UserType)
      );
      navigate("/");
    }
  }

  // Seed demo users
  React.useEffect(() => {
    const usersLoc = localStorage.getItem("user");
    const users: (UserType & { password: string })[] = isStringValid(usersLoc)
      ? JSON.parse(usersLoc as string)
      : [];

    let updated = false;

    demoUsers.forEach((demo) => {
      const exists = users.some(
        (u) => u.email === demo.email || u.username === demo.username
      );
      if (!exists) {
        users.push(demo);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem("user", JSON.stringify(users));
    }
  }, []);

  return (
    <div className={`${s.root} w-full max-w-[520px] mx-auto`}>
      <div className="relative rounded-[28px] border border-[#e5e5e5] shadow-sm bg-white p-6 sm:px-10 pt-8 pb-10">
        <div className="flex-row justify-items-center pb-6">
          <div className="bg-white rounded-full border border-[#ececec] shadow-sm w-12 h-12 grid place-items-center">
            {" "}
            <FiLogIn className="w-5 h-5 text-[#1e1e1e]" />{" "}
          </div>{" "}
        </div>

        <h1 className="text-[24px] sm:text-[28px] font-semibold text-center text-[#111]">
          {isSignUp ? "Create an account" : "Sign in to continue"}
        </h1>
        <p className="mt-1 text-center text-[14px] text-[#8b8b8b]">
          {isSignUp
            ? "Sign up to access all the features on this app"
            : "Sign in to access all the features on this app"}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* Identifier (Sign In) */}
          {!isSignUp && (
            <div className="flex flex-col">
              <label
                htmlFor="identifier"
                className="text-[14px] text-[#333] mb-1"
              >
                Email or username
              </label>
              <input
                type="text"
                id="identifier"
                placeholder="Enter your email or username"
                className={`w-full p-3 bg-white border ${
                  form.identifier.err ? "border-red-500" : "border-[#dcdcdc]"
                } rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4A96FF] text-[16px] placeholder-[#a0a0a0]`}
                onChange={(e) =>
                  setForm({
                    ...form,
                    identifier: { input: e.target.value, err: null },
                  })
                }
              />
              {form.identifier.err && (
                <p className="h-5 text-[13px] font-medium text-red-600 mt-1">
                  {form.identifier.err}
                </p>
              )}
            </div>
          )}

          {/* Email (Sign Up) */}
          {isSignUp && (
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[14px] text-[#333] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-3 bg-white border ${
                  form.email.err ? "border-red-500" : "border-[#dcdcdc]"
                } rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4A96FF] text-[16px] placeholder-[#a0a0a0]`}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: { input: e.target.value, err: null },
                  })
                }
              />
              {form.email.err && (
                <p className="h-5 text-[13px] font-medium text-red-600 mt-1">
                  {form.email.err}
                </p>
              )}
            </div>
          )}

          {/* Username (Sign Up) */}
          {isSignUp && (
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-[14px] text-[#333] mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Choose a preferred username"
                className={`w-full p-3 bg-white border ${
                  form.username.err ? "border-red-500" : "border-[#dcdcdc]"
                } rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4A96FF] text-[16px] placeholder-[#a0a0a0]`}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: { input: e.target.value, err: null },
                  })
                }
              />
              {form.username.err && (
                <p className="h-5 text-[13px] font-medium text-red-600 mt-1">
                  {form.username.err}
                </p>
              )}
            </div>
          )}

          {/* Password */}
          <div className="flex flex-col relative">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="text-[14px] text-[#333]">
                Password
              </label>

              {!isSignUp && (
                <button
                  type="button"
                  className="text-[12px] text-[#4a4a4a] font-[500] hover:underline"
                  onClick={() => toast.info("Forgot password flow TBD")}
                >
                  Forgot password?
                </button>
              )}
            </div>

            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className={`w-full p-3 bg-white border ${
                form.password.err ? "border-red-500" : "border-[#dcdcdc]"
              } rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4A96FF] text-[16px] placeholder-[#a0a0a0]`}
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
              className="absolute right-3 top-9 text-[#888] hover:text-black"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? (
                <FiEye className="w-5 h-5" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
            {form.password.err && (
              <p className="h-5 text-[13px] font-medium text-red-600 mt-1">
                {form.password.err}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="mt-2 w-full py-3 rounded-[10px] bg-[#5B5BD6] text-white text-[16px] font-semibold active:scale-[.99]"
          >
            {isSignUp ? "Continue" : "Sign In"}
          </button>
        </div>
      </div>

      {/* Footer switch */}
      <div className="flex items-center justify-center h-[50px]">
        <p className="text-center text-[14px] text-[#6b6b6b] mt-2">
          {isSignUp ? "Already have an account?" : "Do not have an account?"}
          <button
            className="ml-1 font-semibold text-[#5B5BD6] hover:underline"
            onClick={() => setIsSignUp((v) => !v)}
            type="button"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

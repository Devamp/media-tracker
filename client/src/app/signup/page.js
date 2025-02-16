"use client";
import { useState } from "react";
import { Mail, Key, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const LogoHeader = () => {
  return (
    <div className="flex flex-row items-center justify-center border-white border-b py-2">
      <Image
        src="/TrackifyLogo.PNG"
        width={50}
        height={50}
        alt="Trackify logo"
        className="mr-2"
      />
      <h2 className="text-5xl font-bold">Trackify</h2>
    </div>
  );
};

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // verify if passwords match
  const confirmPasswordMatch = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
    setDoPasswordsMatch(password === confirmPasswordValue);
  };

  // handle the sign up form submission
  const handleSignup = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const signupData = {
      user: username,
      email: email,
      password: password,
    };

    try {
      const res = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (res.ok) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } else {
        console.log("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col items-center w-1/2 bg-stone-300 py-10 rounded-xl">
        <LogoHeader />
        <div className="flex justify-start p-3">
          <h2 className="text-xl font-bold">Sign Up</h2>
        </div>

        <form
          className="w-full max-w-md flex flex-col items-center"
          onSubmit={handleSignup}
          method="POST"
        >
          <div className="flex flex-row items-center w-full p-2 rounded-md">
            <User className="mr-2 text-black" size={28} />
            <input
              className="p-2 flex-1 rounded-md hover:border-black focus:outline-none"
              placeholder="Username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-center justify-center w-full p-2 rounded-md">
            <Mail className="mr-2 text-black" size={28} />
            <input
              className="p-2 flex-1 rounded-md hover:border-black focus:outline-none"
              placeholder="Your Email"
              name="user-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-center w-full p-2 rounded-md">
            <Key className="mr-2 text-black" size={28} />
            <input
              className="p-2 flex-1 rounded-md hover:border-black focus:outline-none"
              placeholder="Password"
              name="user-password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setDoPasswordsMatch(e.target.value === confirmPassword);
              }}
            />
          </div>

          <div className="flex flex-row items-center w-full p-2 rounded-md mb-4">
            <Key className="mr-2 text-black" size={28} />
            <input
              className="p-2 flex-1 rounded-md hover:border-black focus:outline-none"
              placeholder="Confirm Password"
              type="password"
              name="user-confirm-password"
              required
              value={confirmPassword}
              onChange={confirmPasswordMatch}
            />
          </div>

          {!doPasswordsMatch && (
            <p className="text-red-600 p-2">Your passwords do not match.</p>
          )}
          <button
            type="submit"
            className={`bg-blue-400 w-1/2 p-2 rounded-md text-white hover:bg-blue-500 transition-colors ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={isLoading || !doPasswordsMatch}
          >
            {isLoading ? (
              <div className="flex flex-row justify-center">
                <Loader2 className="animate-spin" size={24} />
                <p className="ml-2 ">Signing Up...</p>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <hr className="w-3/5 mt-10 mb-5 border-t-2 border-white" />
        <h3 className="font-bold">
          Already have an account?{" "}
          <span className="font-bold hover:underline">
            <Link href="/login">Log In</Link>
          </span>
        </h3>
      </div>
      <div className="w-3/5 flex-shrink-0 flex-col items-center justify-end">
        <div className="m-10 mb-32">
          <p className="text-white text-6xl font-bold mt-14">
            Discover and Personalize<br></br> Your Entertainment Journey.
          </p>
        </div>
        <div className="bg-white border rounded-xl w-3/4 p-8">
          <p className="text-black font-bold text-2xl ">
            What entertains you the most?
          </p>
          <p className="text-gray-500">
            Select your interests to get personalized recommendations for music,
            podcasts, and audiobooks.
          </p>
          <div className="flex flex-row space-x-2">
            <div className="bg-slate-800 w-24 border rounded-full p-3 mt-5 hover:scale-105">
              <p className="text-white text-center font-bold">Music</p>
            </div>
            <div className="bg-stone-400 w-24 border rounded-full p-3 mt-5 hover:scale-105">
              <p className="text-white text-center font-bold">Podcasts</p>
            </div>
            <div className="bg-slate-800 w-30 border rounded-full p-3 mt-5 hover:scale-105">
              <p className="text-white text-center font-bold">Audiobooks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

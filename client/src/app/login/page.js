"use client";

import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginBody = ({ setWasLoginSuccessful }) => {
  const [isLoading, setIsLoading] = useState(false); // state to hold login processing
  const router = useRouter();

  // handle the logic upon login click
  const handleLogin = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const email = event.target["user-email"].value;
    const password = event.target["user-password"].value;

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // if response is ok, set the user cookie
      setTimeout(async () => {
        if (res.ok) {
          const data = await res.json();

          if (data.token) {
            setWasLoginSuccessful(true);
            sessionStorage.setItem("token", data.token); // store current token in session storage
            router.push("/home");
          }
        } else {
          setWasLoginSuccessful(false);
          console.log("Something went wrong.");
        }

        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="w-full max-w-md flex flex-col items-center"
      onSubmit={handleLogin}
      method="POST"
    >
      <div className="flex flex-row items-center justify-center w-full p-2 rounded-md">
        <Mail className="mr-2 text-black" size={28} />
        <input
          className="p-2 flex-1 rounded-md hover:border-black focus:outline-none"
          placeholder="Your Email"
          name="user-email"
          type="email"
          required
        />
      </div>

      <div className="flex flex-row items-center w-full p-2 rounded-md mb-4">
        <Lock className="mr-2 text-black" size={28} />
        <input
          className="p-2 flex-1 rounded-md hover:border-black focus:outline-none"
          placeholder="Password"
          name="user-password"
          type="password"
          required
        />
      </div>

      <button
        type="submit"
        className={`bg-[#2d5c7c] w-1/2 p-2 rounded-md text-white transition-colors hover:scale-105 ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#356a8e]"
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex flex-row justify-center">
            <Loader2 className="animate-spin" size={24} />
            <p className="ml-2 ">Logging in...</p>
          </div>
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
};

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

export default function Login() {
  const [wasLoginSuccessful, setWasLoginSuccessful] = useState(true);

  return (
    <div className="m-auto flex flex-col justify-center items-center mt-28 bg-stone-300 py-10 w-2/5 border rounded-lg shadow-md shadow-black">
      <LogoHeader />
      <div className="flex justify-center p-3">
        <h2 className="text-xl font-bold">Log in</h2>
      </div>

      <LoginBody setWasLoginSuccessful={setWasLoginSuccessful} />

      {!wasLoginSuccessful && (
        <p className="text-red-600 mt-3">
          Incorrect email or password. Please try again.
        </p>
      )}

      <hr className="w-3/5 mt-10 mb-5 border-t-2 border-white" />
      <h3 className="font-bold text-[#2d5c7c]">
        Don't have an account?{" "}
        <span className="font-bold hover:underline">
          <Link href="/signup">Sign Up</Link>
        </span>
      </h3>
    </div>
  );
}

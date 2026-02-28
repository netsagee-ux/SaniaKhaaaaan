"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiStar,
  FiClock,
  FiShield,
  FiZap,
} from "react-icons/fi";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
});

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");

  const router = useRouter();
  const params = useSearchParams();

  const redirect = params.get("redirect");
  const action = params.get("action");

  const formatError = (msg) => {
    if(msg.includes("Invalid login")){
      return "Email or password is incorrect.";
    }
    if(msg.includes("email")){
      return "Please enter a valid email.";
    }
    return msg;
  };

  const handleLogin = async()=>{

    setErrorMsg("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if(error){
      setErrorMsg(formatError(error.message));
      return;
    }

    if(redirect){
      router.push(
        `${redirect}?action=${action || ""}&done=true`
      );
    }else{
      router.push("/dashboard");
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-white flex items-center justify-center px-4 ${poppins.className}`}>

      {/* ========= ANIMATED BACKGROUND ========= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-blue-200/40 blur-[180px] rounded-full animate-pulse top-[-200px] left-[-150px]" />
        <div className="absolute w-[600px] h-[600px] bg-purple-200/40 blur-[180px] rounded-full animate-pulse bottom-[-200px] right-[-150px]" />

        {/* FLOATING DOTS */}
        <div className="absolute w-2 h-2 bg-gray-300 rounded-full top-[20%] left-[25%] animate-bounce" />
        <div className="absolute w-2 h-2 bg-gray-300 rounded-full top-[45%] left-[75%] animate-bounce delay-300" />
        <div className="absolute w-2 h-2 bg-gray-300 rounded-full top-[70%] left-[30%] animate-bounce delay-700" />
      </div>

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 gap-6">

        {/* ========= LEFT BRAND SECTION ========= */}
        <div className="hidden md:flex flex-col justify-center p-8">

          <h1 className={`${inter.className} text-5xl font-bold text-gray-900 leading-tight`}>
            Welcome <br/> Back
          </h1>

          <p className="mt-4 text-sm text-gray-500 max-w-sm">
            Continue building your professional brand and manage your work
            with a clean, modern experience.
          </p>

          <div className="mt-8 space-y-5">

            <div className="flex gap-3">
              <FiStar className="mt-1"/>
              <div>
                <h3 className={`${inter.className} font-semibold`}>Best Features</h3>
                <p className="text-sm text-gray-500">
                  Brand-focused dashboard with elegant user experience.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FiShield className="mt-1"/>
              <div>
                <h3 className={`${inter.className} font-semibold`}>Secure Access</h3>
                <p className="text-sm text-gray-500">
                  Safe authentication powered by Supabase security.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FiZap className="mt-1"/>
              <div>
                <h3 className={`${inter.className} font-semibold`}>Fast Experience</h3>
                <p className="text-sm text-gray-500">
                  Smooth performance across all devices.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FiClock className="mt-1"/>
              <div>
                <h3 className={`${inter.className} font-semibold`}>Coming Soon</h3>
                <p className="text-sm text-gray-500">
                  Analytics dashboard, automation tools and growth insights.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ========= LOGIN CARD ========= */}
        <div className="backdrop-blur-xl bg-white/90 border border-gray-100 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 sm:p-10">

          <div className="text-center mb-8">
            <h2 className={`${inter.className} text-4xl font-bold text-gray-900`}>
              Login
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Access your account and continue working
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 flex gap-3 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
              <FiAlertCircle className="mt-0.5"/>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-4">

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full h-12 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition"
            />

            <div className="relative">

              <input
                type={showPassword ? "text":"password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-12 px-4 pr-12 rounded-2xl bg-gray-50 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={18}/> : <FiEye size={18}/>}
              </button>

            </div>

            <button
              onClick={handleLogin}
              className={`${inter.className} w-full h-12 rounded-2xl bg-black text-white text-sm font-semibold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl`}
            >
              Login
            </button>

          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Secure authentication • Supabase
          </p>

        </div>

      </div>
    </div>
  );
}

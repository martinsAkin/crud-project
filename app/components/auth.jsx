"use client"
import { useState, useEffect } from 'react';

const Authentication = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#e8e8e8] ${darkMode ? "text-white" : "text-white"} ${darkMode ? 'bg-white' : 'bg-black'}`}>
      <div className="bg-gray-200 dark:bg-black p-6 rounded-xl w-[320px] shadow-lg text-center relative md:w-[80%]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-[#666] dark:text-white">#e8e8e8</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={() => setDarkMode(!darkMode)} />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

            <section className="flex flex-col gap-[1.5rem] md:flex-row md:gap-8">
              <SignUp />
              <LogIn />
            </section>
      </div>
    </div>
  );
}

const LogIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault();
  try{
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    alert(data.message);
  } catch(error) {
      alert(error.message)
    }
  }

  return (
    <div>
          <form className="bg-[#d3d3d3] dark:bg-black border border-black dark:border-white p-5 rounded-lg shadow-md text-left" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-center text-black dark:text-white mb-4">Log in</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded border border-black dark:border-white dark:bg-black dark:text-white shadow-md"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded border border-black dark:border-white dark:bg-black dark:text-white shadow-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white rounded shadow-md"
          >
            Let`s go!
          </button>
        </form>
    </div>
  )
}


const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault();
    
    try{
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    alert(data.message);
  } catch(error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <form className="bg-[#d3d3d3] dark:bg-black border border-black dark:border-white p-5 rounded-lg shadow-md text-left" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold underline text-center text-black dark:text-white mb-4">Create Your Account</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded border border-black dark:border-white dark:bg-black dark:text-white shadow-md"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded border border-black dark:border-white dark:bg-black dark:text-white shadow-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white rounded shadow-md"
          >
            Create Account!
          </button>
        </form>
    </div>
  )
}


export default Authentication
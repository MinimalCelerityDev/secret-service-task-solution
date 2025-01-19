"use client";

import { useState } from "react";

export default function Home() {

  const [secret, setSecret] = useState("");

  //  Default TTL: Sets the default expiration time for cached data.
  const [ttl, setTtl] = useState(60); 
  // Default max views: Sets the maximum number of allowed views before restricting access.
  const [maxViews, setMaxViews] = useState(1); 

  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      content: secret,
      ttl,
      maxViews,
    };

    try {
      const res = await fetch("http://localhost:3001/api/secret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponseMessage(`Your secret ID will be this one: ${result.id}`);
    } catch (error) {
      console.error("Error while creating secret, try again:", error);
      setResponseMessage("Something went wrong very badly!, try again");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-gray-400 to-blue-900 flex flex-col items-center justify-center text-white p-6">

      {/*

       This will be the header section

       */}
      <header className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 py-4 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide animate-pulse">
          🛠️ Shoprenter Backend Task Solution
        </h1>
        <p className="text-xl font-serif mt-1 text-gray-800">
          By Balog Sebastian Máté
        </p>
      </header>

      {/* 

        This will be the form section of the page

      */}
      <main className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl mt-10 p-8 border border-blue-500 hover:shadow-blue-700 transition-all">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">
          Create a New Secret 🔒
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/*

          Here will be the secret section

          */}
          <div className="col-span-1">
            <label htmlFor="secret" className="block text-lg font-semibold mb-2">
              Your secret
            </label>
            <textarea
              id="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter your secret right here..."
              className="w-full bg-gray-900 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-200 p-4 shadow-md"
              rows={5}
              required
            />
          </div>

          {/*

          This is the section for TTL and MaxViews

            */}
          <div className="col-span-1 space-y-6">
            <div>
              <label htmlFor="ttl" className="block text-lg font-semibold mb-2">
                Time-to-Live(TTL)
              </label>
              <input
                type="number"
                id="ttl"
                value={ttl}
                onChange={(e) => setTtl(Number(e.target.value))}
                min={1}
                className="w-full bg-gray-900 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-200 p-4 shadow-md"
                required
              />
            </div>

            <div>
              <label htmlFor="maxViews" className="block text-lg font-semibold mb-2">
                Maximum Views
              </label>
              <input
                type="number"
                id="maxViews"
                value={maxViews}
                onChange={(e) => setMaxViews(Number(e.target.value))}
                min={1}
                className="w-full bg-gray-900 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-200 p-4 shadow-md"
                required
              />
            </div>
          </div>

          {/* 
          
          Here will be the submit button
          
          */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Submit Your Secret right here 🚀
            </button>
          </div>
        </form>

        {/*
        
        This will be the respons message
        
        */}
        {responseMessage && (
          <div className="mt-8 bg-blue-800 text-blue-100 p-4 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{responseMessage}</p>
          </div>
        )}
      </main>
    </div>
    
  );
}

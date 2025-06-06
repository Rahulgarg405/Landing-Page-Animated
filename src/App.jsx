import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Exp from "./components/Exp";
import Navbar from "./components/Navbar";
import Features from "./components/Features";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* <Exp /> */}
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  );
};

export default App;

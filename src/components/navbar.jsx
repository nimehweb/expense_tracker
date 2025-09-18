import React from "react";
import { Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center py-6 px-10 shadow-md sticky top-0 z-50 bg-white/0 backdrop-blur-md">
      <div>
        <h1 className="text-4xl font-bold text-green-700">
          Expensify<span className="text-red-700">X</span>
        </h1>
      </div>
      <nav className="flex gap-6 text-lg font-medium">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/history">History</NavLink>
      </nav>
      <div className="flex items-center gap-2">
        <Sun className="text-2xl" />
        <div className="p-4 cursor-pointer rounded-full w-8 h-8 text-white font-semibold bg-red-600 hover:shadow-2xl flex items-center justify-center">
          A
        </div>
      </div>
    </div>
  );
}

export default Navbar;

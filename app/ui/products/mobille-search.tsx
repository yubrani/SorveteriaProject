"use client";

import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchBar from "./searchbar";

export default function MobileSearch() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl hover:bg-slate-100 transition"
        >
          <FaSearch className="w-4 h-4 text-slate-600" />
        </button>
      ) : (
        <div className="fixed top-0 left-0 w-full bg-white z-50 p-4 shadow-md flex items-center gap-2">
          <div className="flex items-center gap-2 w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50">
            <FaSearch className="text-slate-400 w-4 h-4" />

            <div className="w-full">
              <SearchBar />
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-100 transition"
          >
            <FaTimes className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      )}
    </div>
  );
}
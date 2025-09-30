"use client";

import { Bell, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-teal-800 text-white px-6 py-4 md:flex md:justify-between md:items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-3xl hidden md:flex">
        <span className="bg-yellow-400 p-2 rounded-lg">🎒</span>
        TrackSure
          </div>

     {/* Logo mobile*/}
     <div className="flex items-center justify-center pt-4 pb-12 md:hidden gap-2 font-bold text-3xl">
        <span className="bg-yellow-400 p-2 rounded-lg">🎒</span>
        TrackSure
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6 text-lg hidden md:flex ">
        <p>
          Welcome, <span className="font-semibold">Ann Chepkirui</span>
        </p>

        {/* Notifications */}
        <div className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
            2
          </span>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-1 hover:text-gray-200">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
          </div>
          
           {/* bottom mobile side */}
      <div className="flex items-center justify-between w-full gap-6 text-xl md:hidden">
        <p>
          Welcome, <span className="font-semibold">Ann Chepkirui</span>
        </p>
              <div className="flex items-center gap-4">
                  {/* Notifications */}
        <div className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
            2
          </span>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-1 hover:text-gray-200">
          <LogOut className="w-5 h-5" />
         
        </button>

</div>
        
      </div>
    </header>
  );
}

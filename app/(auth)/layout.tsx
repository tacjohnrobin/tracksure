import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
   
      <div className="w-full max-w-xl p-6 rounded-2xl overflow-hidden">
        {/* Logo / App name */}
        <div className="p-6 bg-[#1f5e6b] text-white  text-center rounded-t-2xl ">
        <h1 className="  text-4xl font-bold">
          TrackSure
         </h1>
         <p className="mb-6">Tracksure Airport Lost & Found System</p>
      </div>
        {/* The page content (Login or Register form) */}
        {children}

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} TrackSure. All rights reserved.
        </p>
      </div>
    </div>
  );
}

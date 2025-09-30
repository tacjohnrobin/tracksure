"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: connect API
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg bg-white p-6 shadow-md"
    >
      {/* Full Name */}
      <div>
        <Label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <FaUser /> Full Name
        </Label>
        <Input type="text" placeholder="Enter your full name" required />
      </div>

      {/* Email */}
      <div>
        <Label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <FaEnvelope /> Email Address
        </Label>
        <Input type="email" placeholder="Enter your email" required />
      </div>

      {/* Phone */}
      <div>
        <Label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <FaPhone /> Phone Number
        </Label>
        <Input type="tel" placeholder="Enter your phone number" required />
      </div>

      {/* Role Dropdown */}
      <div>
        <Label className="block text-gray-700 text-sm font-medium mb-1">
          Role
        </Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="passenger">Passenger</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Password */}
      <div>
        <Label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <FaLock /> Password
        </Label>
        <Input type="password" placeholder="Create a password" required />
      </div>

      {/* Confirm Password */}
      <div>
        <Label className="flex py-2 items-center gap-2 text-gray-700 text-sm font-medium">
          <FaLock /> Confirm Password
        </Label>
        <Input type="password" placeholder="Confirm your password" required />
      </div>
       <a href="/passenger">
      <Button type="submit" className="w-full rounded-full bg-[#1f5e6b] py-6 mt-6" disabled={loading}>
        {loading ? "Registering..." : "Register"}
       </Button>
       </a>
    </form>
  );
}

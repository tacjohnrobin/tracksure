"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReportItemForm from "./reportItemForm";


export default function ReportsTable() {
  const [reports, setReports] = useState([
    {
      item: "Black Samsonite Suitcase",
      sub: "Luggage • KQ 100",
      date: "2024-05-20",
      status: "Open",
    },
  
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addReport = (formData: any) => {
    const newReport = {
      item: formData.itemName,
      sub: `${formData.category} ${formData.flightNumber ? "• " + formData.flightNumber : ""}`,
      date: formData.dateLost,
      status: "Open",
    };
    setReports([...reports, newReport]);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My lost item reports</h2>

        {/* Add New Item Button with Popup */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-4">
              + Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[70vh] lg:max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg mb-2">Report Lost Item</DialogTitle>
            </DialogHeader>
            <ReportItemForm onSubmit={addReport} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table for desktop */}
      <div className="hidden md:block rounded-xl overflow-hidden border shadow-sm">
        <Table>
          <TableHeader className="bg-teal-800 text-white">
            <TableRow>
              <TableHead className="px-6 py-3">Item</TableHead>
              <TableHead className="px-6 py-3">Date Reported</TableHead>
              <TableHead className="px-6 py-3">Status</TableHead>
              <TableHead className="px-6 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((r, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4">
                  <p className="font-medium">{r.item}</p>
                  <p className="text-sm text-gray-500">{r.sub}</p>
                </TableCell>
                <TableCell className="px-6 py-4">{r.date}</TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      r.status === "Open" && "bg-yellow-100 text-yellow-700",
                      r.status === "Matched" && "bg-blue-100 text-blue-700",
                      r.status === "Resolved" && "bg-green-100 text-green-700"
                    )}
                  >
                    {r.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <button className="bg-teal-700 text-white px-4 py-1 rounded-full text-sm hover:bg-teal-800">
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden space-y-4">
        {reports.map((r, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-sm p-4 space-y-2"
          >
            <div>
              <p className="font-medium">{r.item}</p>
              <p className="text-sm text-gray-500">{r.sub}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold text-gray-600">Date:</span>
                <p>{r.date}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Status:</span>
                <p>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      r.status === "Open" && "bg-yellow-100 text-yellow-700",
                      r.status === "Matched" && "bg-blue-100 text-blue-700",
                      r.status === "Resolved" && "bg-green-100 text-green-700"
                    )}
                  >
                    {r.status}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-teal-700 text-white px-4 py-1 rounded-full text-sm hover:bg-teal-800">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

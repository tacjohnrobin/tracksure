"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReportItemForm({ onSubmit }: { onSubmit: (item: any) => void }) {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    dateLost: "",
    flightNumber: "",
    barcode: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.itemName) newErrors.itemName = "Item Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.dateLost) newErrors.dateLost = "Date Lost is required";
    return newErrors;
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(formData); // send data back to parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Item Name */}
      <div>
        <Label htmlFor="itemName" className="mb-4">Item Name</Label>
        <Input
          id="itemName"
          placeholder="e.g., Black Samsonite Suitcase"
          value={formData.itemName}
          onChange={(e) => handleChange("itemName", e.target.value)}
        />
        {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName}</p>}
      </div>

      {/* Category */}
      <div>
        <Label className="mb-4">Category</Label>
        <Select
          onValueChange={(value) => handleChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="luggage">Luggage</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="clothing">clothing</SelectItem>
                      <SelectItem value="jewelry">jewelry</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="mb-4">Description</Label>
        <Textarea
          id="description"
          placeholder="Provide details like color, brand, features..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location" className="mb-4">Last Seen Location</Label>
        <Input
          id="location"
          placeholder="e.g., Terminal 1A, Security Checkpoint"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      {/* Date Lost */}
      <div>
        <Label htmlFor="dateLost" className="mb-4">Date Lost</Label>
        <Input
          id="dateLost"
          type="date"
          value={formData.dateLost}
          onChange={(e) => handleChange("dateLost", e.target.value)}
        />
        {errors.dateLost && <p className="text-red-500 text-sm">{errors.dateLost}</p>}
      </div>

      {/* Flight Number */}
      <div>
        <Label htmlFor="flightNumber" className="mb-4">Flight Number (if applicable)</Label>
        <Input
          id="flightNumber"
          placeholder="e.g., KQ 100"
          value={formData.flightNumber}
          onChange={(e) => handleChange("flightNumber", e.target.value)}
        />
      </div>

      {/* Barcode */}
      <div>
        <Label htmlFor="barcode" className="mb-4">Barcode/RFID (if known)</Label>
        <Input
          id="barcode"
          placeholder="e.g., 12345XYZ"
          value={formData.barcode}
          onChange={(e) => handleChange("barcode", e.target.value)}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <Button type="submit" className="bg-brand hover:bg-teal-800 text-white py-6 rounded full w-full ">
          Save
        </Button>
      </div>
    </form>
  );
}

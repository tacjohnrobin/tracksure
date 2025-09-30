import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="shadow-sm rounded-lg w-full">
      <CardContent className="md:p-6 flex flex-col items-center justify-center gap-2">
        <div className="text-6xl text-teal-700">{icon}</div>
        <h3 className="text-4xl md:text-5xl font-bold">{value}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
      </CardContent>
    </Card>
  );
}

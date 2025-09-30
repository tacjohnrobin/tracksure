import Header from "@/components/dashboard/header";


export default function PassengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-base">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-6">{children}</main>
    </div>
  );
}

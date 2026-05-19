import AllAppointmentsClient from "@/components/allappoint/AllAppointments";

export const metadata = {
  title: "All Appointments",
  description: "View and manage all available medical appointments and consult top doctors.",
};

export default function AllAppointmentsPage() {
  return (
    <div className="w-full min-h-[calc(100vh-75px-360px)] bg-red-50 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <AllAppointmentsClient />
      </div>
    </div>
  );
}
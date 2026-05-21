import RegisterForm from "@/components/forms/RegisterForm";

// Proper page metadata initialization for high structural project quality
export const metadata = {
  title: "Register",
  description: "Create a new DocAppoint account to securely connect with top healthcare specialists.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7fb] px-4">
      <RegisterForm />
    </div>
  );
}
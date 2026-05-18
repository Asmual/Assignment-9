import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = {
  title: "Register",
  description: "Create a new DocAppoint account to connect with top specialists.",
};


export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7fb] px-4">
      <RegisterForm />
    </div>
  );
}
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = {
  title: "Register",
  description: "Create a new DocAppoint account to connect with top specialists.",
};



export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <RegisterForm />
    </div>
  );
}
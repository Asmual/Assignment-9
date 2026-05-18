import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
  title: "Login",
  description: "Login to your DocAppoint account to book and manage your medical appointments.",
};


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7fb] px-4">
      <LoginForm />
    </div>
  );
}
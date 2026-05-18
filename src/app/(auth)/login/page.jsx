import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
  title: "Login",
  description: "Login to your DocAppoint account to book and manage your medical appointments.",
};


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <LoginForm />
    </div>
  );
}
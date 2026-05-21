import LoginForm from "@/components/forms/LoginForm";

// Accurate metadata mapping to maximize application indexing and compliance
export const metadata = {
  title: "Login",
  description: "Login to your DocAppoint account to book and manage your medical appointments securely.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7fb] px-4">
      <LoginForm />
    </div>
  );
}
import LoginForm from "../ui/login-form";
export const dynamic = "force-dynamic";
import Link from "next/link";


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
     
    </div>
  );
}
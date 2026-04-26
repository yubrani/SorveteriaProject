import CreateUserForm from "@/app/ui/createuser-form";
export const dynamic = "force-dynamic";

export default function CreateUserPage() {
  return (
    
    <div className="flex items-center justify-center h-screen">
      <CreateUserForm />
    </div>
  );
}
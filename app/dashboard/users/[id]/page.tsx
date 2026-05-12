import UpdateUserForm from "@/app/ui/users/edit-user";


export default function UsersPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-red-500">
            👥 Usuarios
        </h1>
       
    </div>
  );
}
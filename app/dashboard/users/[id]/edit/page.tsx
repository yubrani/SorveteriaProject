import UpdateUserForm from "@/app/ui/users/edit-user";

import { auth } from "@/auth";

export default async function Page() {

  const session = await auth();

  return (
    <UpdateUserForm session={session} />
  );
}
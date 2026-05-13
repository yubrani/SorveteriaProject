import NavBar from "@/app/ui/products/nav-bar";
import { Toaster } from "sonner";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
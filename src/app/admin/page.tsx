import { isAdmin } from "@/lib/admin";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const App = dynamic(() => import("./App"), { ssr: false });

export default function AdminPage() {
  if (!isAdmin) {
    redirect("/");
  }

  return <App />;
}

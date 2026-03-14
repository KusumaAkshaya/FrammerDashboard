<<<<<<< HEAD
import Image from "next/image";
import Dashboard from "./dashboard/page";
import Nav from "./components/nav";

export default function Home() {
  return (<div className="bg-slate-800" >
    <Nav />
    <Dashboard />
    </div>
  );
}
=======
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}
>>>>>>> 76c73653154b21c0fbad82df85926c961d039801

import AccountForm from "./components/AccountForm";
import { getUserData } from "./lib/getUserData";
import LinksComponent from "./components/LinkComponents/LinksComponent";
import NotAuthenticated from "@/app/components/NotAuthenticated";

export default async function AdminPage() {
  const user = await getUserData();
  if (user) {
    return (
      <section className="flex flex-wrap gap-4">
        <AccountForm user={user} />
        <LinksComponent links={user.links} userID={user.id} />
      </section>
    );
  }
  return <NotAuthenticated />;
}

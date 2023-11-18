import AccountForm from "./components/AccountForm";
import { getUserData } from "./lib/getUserData";
import LinksComponent from "./components/LinkComponents/LinksComponent";
import NotAuthenticated from "@/app/components/NotAuthenticated";

// Default function for the AdminPage component
export default async function AdminPage() {
  // Fetch user data using the getUserData function
  const user = await getUserData();

  // Check if user data is available
  if (user) {
    return (
      // Render a section with account form and links components
      <section className="flex flex-wrap gap-4">
        {/* Render the AccountForm component with user data */}
        <AccountForm user={user} />
        {/* Render the LinksComponent with user's links and user ID */}
        <LinksComponent links={user.links} userID={user.id} />
      </section>
    );
  }

  // If user data is not available, render the NotAuthenticated component
  return <NotAuthenticated />;
}

"use client";
import getUserSlug from "@/app/lib/getUserSlug";
import { useEffect, useState } from "react";

// Sayfa bileşeni
function UserPage({ params }: any) {
  // const [user, setUser] = useState<any>(null);
  const paramsUsername = params.username;
  const [userData, setUserData] = useState<null | any>(null);
  const [links, setLinks] = useState<null | any>(null);

  useEffect(() => {
    // Define an async function to use await
    const fetchData = async () => {
      try {
        // Call the getUserSlug function
        const data = await getUserSlug({ paramsUsername });
        // Handle the returned data
        setUserData(data);
        setLinks(data.links);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    // Call the async function
    fetchData();
  }, [paramsUsername]); // Make sure to include any dependencies that should trigger a re-fetch

  return (
    userData && (
      <section className="bg-slate-700 p-3 rounded-md text-center">
        <h1 className="text-2xl font-bold">{userData?.full_name}</h1>
        <h1 className="text-sm font-thin">@{userData?.username}</h1>
        <h1 className="text-base">{userData?.bio}</h1>
        <a href={userData?.website} className="font-mono text-sm">
          {userData?.website}
        </a>
        <div className=" space-y-2 flex flex-col mt-4">
          {Object.keys(links)?.map((key) => (
            <a
              target="_blank"
              key={key}
              href={links[key].url}
              className="bg-zinc-700 p-2 text-center min-w-[15rem] rounded-full hover:bg-zinc-800 transition-colors duration-300 ease-in-out"
            >
              {links[key].label}
            </a>
          ))}
        </div>
      </section>
    )
  );
}

export default UserPage;

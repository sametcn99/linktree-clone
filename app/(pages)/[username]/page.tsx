"use client"; // Assuming this is a special comment, it's kept as is

import getUser from "@/app/lib/getUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { downloadImage } from "../admin/lib/getAvatar";
import { motion } from "framer-motion";
import NotFound from "@/app/not-found";
import Loading from "@/app/loading";

// UserPage component
function UserPage({ params }: any) {
  // Destructure username from params
  const paramsUsername = params.username;

  // State variables for user data, links, image URL, and not found indicator
  const [userData, setUserData] = useState<null | any>(null);
  const [links, setLinks] = useState<null | any>(null);
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  // Framer Motion animation variants
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Effect to fetch user data
  useEffect(() => {
    // Define an async function to use await
    const fetchData = async () => {
      try {
        // Call the getUser function
        const data = await getUser({ paramsUsername });

        // Check if user data is not available
        if (!data) {
          setNotFound(true);
          return;
        }

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

  // Effect to download and set image URL
  useEffect(() => {
    // Extract the avatar URL from user data
    const path = userData?.avatar_url;

    // Define an async function to use await
    const fetchData = async () => {
      try {
        // Call the downloadImage function
        const url = await downloadImage(path);

        // Check if the URL is available
        if (url) {
          setImageUrl(url);
        } else {
          console.error("Image URL is undefined.");
        }
      } catch (error) {
        // Handle errors
        console.error("Error loading image:", error);
      }
    };

    // Check if the avatar URL is available before fetching
    if (userData?.avatar_url) fetchData();
  }, [userData?.avatar_url]);

  // Render different components based on the state
  return userData ? (
    <>
      {/* Background */}
      <div className="absolute z-0 w-full h-full bg-zinc-250 dark:bg-zinc-950" />

      {/* User information section */}
      <section className="flex z-10 flex-col justify-center items-center p-6 text-center bg-gray-600 bg-opacity-30 rounded-2xl select-none h-fit w-[20rem]">
        {/* Display user avatar if available */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Downloaded Image"
            width={120}
            height={120}
            className="rounded-full"
            loading="eager"
          />
        )}

        {/* Display user's full name */}
        <h1 className="text-2xl font-bold">{userData?.full_name}</h1>

        {/* Display user's website if available */}
        <a
          href={userData?.website}
          className="text-sm font-light hover:underline"
          target="_blank"
        >
          Website
        </a>

        {/* Display user's bio */}
        <h1 className="mt-1 font-extralight">{userData?.bio}</h1>

        {/* Links section with Framer Motion animation */}
        <motion.div
          className="flex flex-col mt-4 space-y-2"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Map over links and create animated link components */}
          {Object.keys(links)?.map((key) => (
            <motion.a
              target="_blank"
              key={key}
              href={links[key].url}
              variants={item}
              className="p-2 text-center rounded-full transition-colors duration-300 ease-in-out bg-zinc-700 w-[18rem] hover:bg-zinc-800"
            >
              {links[key].label}
            </motion.a>
          ))}
        </motion.div>
      </section>
    </>
  ) : notFound ? (
    // Render Not Found component if user data is not available
    <NotFound />
  ) : (
    // Render Loading component while fetching user data
    <Loading />
  );
}

export default UserPage;

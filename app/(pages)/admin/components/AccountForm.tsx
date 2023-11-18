"use client"; // Assuming this is a special comment, it's kept as is

import { useEffect, useState } from "react";
import { updateUserData } from "../lib/updateUserData";
import Avatar from "./avatar";

// AccountForm component
export default function AccountForm({ user }: { user: any }) {
  // State variables for user details
  const [fullname, setFullname] = useState(user.full_name); // Assuming this should be 'user.full_name' instead of 'data.full_name' [1]
  const [website, setWebsite] = useState(user.website); // Assuming this should be 'user.full_name' instead of 'data.full_name' [1]
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio); // Assuming this should be 'user.bio'
  const [avatar_url, setAvatarUrl] = useState(user.avatar_url);

  // Event handler for full name change
  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(event.target.value);
  };

  // Event handler for website change
  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newWebsite = event.target.value;

    // Check if the input value starts with "https://"
    if (!newWebsite.startsWith("https://")) {
      // If not, prepend "https://"
      newWebsite = "https://" + newWebsite;
    }

    // Update the state with the modified website value
    setWebsite(newWebsite);
  };

  // Event handler for bio change
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  // Event handler for username change
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Call the updateUserData function with updated user details
    try {
      await updateUserData({
        fullname,
        username,
        userID: user.id,
        bio,
        avatar_url,
        website,
        updated_at: new Date().toISOString(),
      });
    } finally {
      window.location.reload();
    }
  };

  // Render the AccountForm component
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 mx-auto space-y-4  bg-gray-800 rounded-md min-w-[30rem]"
      >
        {/* Avatar component for user profile image */}
        <Avatar
          uid={user.id}
          url={avatar_url}
          size={150}
          onUpload={async (url: any) => {
            setAvatarUrl(url);
          }}
        />
        {/* Input field for full name */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Name</label>
          <input
            type="text"
            id="name"
            className="py-2 px-4 w-full text-white bg-gray-700 rounded-md border"
            defaultValue={fullname}
            onChange={handleFullnameChange}
          />
        </div>
        {/* Input field for username */}
        <div>
          <label className="block mb-2 text-sm font-semibold">User Name</label>
          <input
            type="text"
            id="username"
            className="py-2 px-4 w-full text-white bg-gray-700 rounded-md border"
            defaultValue={username}
            onChange={handleUsernameChange}
          />
        </div>
        {/* Input field for website */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Website</label>
          <input
            type="text"
            id="website"
            className="py-2 px-4 w-full text-white bg-gray-700 rounded-md border"
            defaultValue={website}
            onChange={handleWebsiteChange}
          />
        </div>
        {/* Textarea for bio */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Bio</label>
          <textarea
            id="bio"
            className="py-2 px-4 w-full text-white bg-gray-700 rounded-md border"
            defaultValue={bio}
            onChange={handleBioChange}
            rows={7}
          />
        </div>
        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="py-2 px-4 w-full font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { updateUserData } from "../lib/updateUserData";

export default function AccountForm({ user }: { user: any }) {
  const [fullname, setFullname] = useState(user.full_name);
  const [username, setUsername] = useState(user.username);

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Assuming updateUserData returns a Promise
    await updateUserData({ fullname, username, userID: user.id });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 mx-auto space-y-4 max-w-md bg-gray-800 rounded-md"
      >
        <div>
          <label className="block mb-2 text-sm font-semibold">Name</label>
          <input
            type="text"
            id="name"
            className="py-2 px-4 w-full text-white bg-gray-700 rounded-md border"
            value={fullname}
            onChange={handleFullnameChange}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">User Name</label>
          <input
            type="text"
            id="username"
            className="py-2 px-4 w-full text-white bg-gray-700 rounded-md border"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
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

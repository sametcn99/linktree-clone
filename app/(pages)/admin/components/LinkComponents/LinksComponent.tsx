"use client"; // Assuming this is a special comment, it's kept as is

import { useState } from "react";
import LinkInput from "./LinkInput";
import { updateLinks } from "../../lib/updateLinks";

// LinksComponent component
export default function LinksComponent({ ...props }) {
  // State variable for links data
  const [linksData, setLinksData] = useState(props.links);

  // Event handler for URL change
  const handleUrlChange = (event: any, labelText: any) => {
    const { value } = event.target;

    // Update the linksData state with the new URL value
    setLinksData((prevData: any) => ({
      ...prevData,
      [labelText]: { ...prevData[labelText], url: value },
    }));
  };

  // Event handler for label change
  const handleLabelChange = (event: any, labelText: any) => {
    const { value } = event.target;

    // Update the linksData state with the new label value
    setLinksData((prevData: any) => ({
      ...prevData,
      [labelText]: { ...prevData[labelText], label: value },
    }));
  };

  // Event handler for removing a link
  const onRemove = (id: any) => {
    setLinksData((prevData: any) => {
      const newData = { ...prevData };

      // Remove the link with the specified ID
      Object.keys(newData).forEach((key) => {
        if (key === id) {
          delete newData[key];
        }
      });

      return newData;
    });
  };

  // Event handler for adding a new link
  const onAdd = () => {
    setLinksData((prevData: any) => {
      const newId = Object.keys(prevData).length + 1; // Generate a unique ID based on the current length
      return {
        ...prevData,
        [newId]: { url: "" }, // Initialize with an empty URL
      };
    });
  };

  // Event handler for saving the updated links data
  const onSave = () => {
    console.log("onSave", linksData);
    const date = new Date().toISOString();
    updateLinks(linksData, props.userID ,date);
  };

  // Render the LinksComponent
  return (
    <>
      <section className="w-full min-h-screen">
        <section className="p-6 mx-auto space-y-4 max-w-md bg-gray-800 rounded-md">
          <h1>Links</h1>
          {/* Map over linksData and render LinkInput components */}
          {Object.keys(linksData).map((key) => (
            <LinkInput
              key={key}
              linksData={linksData[key]}
              handleUrlChange={(event: any) => handleUrlChange(event, key)}
              handleLabelChange={(event: any) => handleLabelChange(event, key)}
              onRemove={() => onRemove(key)}
            />
          ))}

          {/* Button to add a new link */}
          <button onClick={onAdd} className="p-2 m-1 bg-slate-600">
            Add Link
          </button>

          {/* Button to save the changes */}
          <button onClick={onSave} className="p-2 m-1 bg-slate-600">
            Save
          </button>
        </section>
      </section>
    </>
  );
}

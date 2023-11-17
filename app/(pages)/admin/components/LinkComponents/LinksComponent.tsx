"use client";

import { useState } from "react";
import LinkInput from "./LinkInput";
import { updateLinks } from "../../lib/updateLinks";

export default function LinksComponent({ ...props }) {
  const [linksData, setLinksData] = useState(props.links);

  const handleUrlChange = (event: any, labelText: any) => {
    console.log("handleInputChange", event.target.value, labelText);
    const { value } = event.target;

    setLinksData((prevData: any) => ({
      ...prevData,
      [labelText]: { ...prevData[labelText], url: value },
    }));
    console.log("linksData", linksData);
  };

  const handleLabelChange = (event: any, labelText: any) => {
    console.log("handleLabelChange", event.target.value, labelText);
    const { value } = event.target;
    setLinksData((prevData: any) => ({
      ...prevData,
      [labelText]: { ...prevData[labelText], label: value },
    }));
    console.log("linksData", linksData);
  };

  const onRemove = (id: any) => {
    setLinksData((prevData: any) => {
      const newData = { ...prevData };

      // Filtreleme yaparak belirli bir id'ye sahip öğeyi sil
      Object.keys(newData).forEach((key) => {
        if (key === id) {
          delete newData[key];
        }
      });

      return newData;
    });
  };

  const onAdd = () => {
    setLinksData((prevData: any) => {
      const newId = Object.keys(prevData).length + 1; // Generate a unique ID based on the current length
      return {
        ...prevData,
        [newId]: { url: "" }, // Initialize with an empty URL
      };
    });
  };
  const onSave = () => {
    console.log("onSave", linksData);
    updateLinks(linksData, props.userID);
  };

  return (
    <>
      <section className="p-6 mx-auto space-y-4 max-w-md bg-gray-800 rounded-md">
        <h1>Links</h1>
        {Object.keys(linksData).map((key) => (
          <LinkInput
            key={key}
            linksData={linksData[key]}
            handleUrlChange={(event: any) => handleUrlChange(event, key)}
            handleLabelChange={(event: any) => handleLabelChange(event, key)}
            onRemove={() => onRemove(key)}
          />
        ))}
        <button onClick={onAdd} className="p-2 m-1 bg-slate-600">
          Add Link
        </button>
        <button onClick={onSave} className="p-2 m-1 bg-slate-600">
          Save
        </button>
      </section>
    </>
  );
}

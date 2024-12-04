import { DeleteIcon, Map, Plus } from "lucide-react";
import React, { useState } from "react";

const VisitedLocation = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      // Update tags using the functional setTags form
      setTags((prevTags) => {
        const newTags = [...prevTags, inputValue.trim()];
        console.log("Updated tags:", newTags); // Now logs the updated tags
        return newTags;
      });

      // Clear the input field after adding the tag
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  return (
    <div className="flex items-start justify-start mt-3">
      <div>
        {/* Render tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {tags.map((tag, index) => (
              <span
                className="flex items-center justify-center gap-2 text-sm text-cyan-600 bg-cyan-200/40 px-3 py-1 rounded"
                key={index}
              >
                <Map className="text-sm" />
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-300"
                >
                  <DeleteIcon className="size-5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Input and button for adding tags */}
        <div className="flex items-center gap-4 mt-3">
          <input
            type="text"
            value={inputValue}
            className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
            placeholder="Add Location"
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            onClick={addNewTag}
            className="w-8 h-8 flex items-center justify-center rounded border border-cyan-500 hover:bg-cyan-500"
          >
            <Plus className="text-2xl text-cyan-500 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitedLocation;

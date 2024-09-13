"use client";

import React, { useState } from "react";

const MultiColorInput = () => {
  const [text, setText] = useState("Some default text with colors");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="relative w-72">
      {/* Styled colored text displayed behind input */}
      <div className="absolute top-0 left-0 pointer-events-none text-transparent text-base">
        {/* Custom logic to color different parts of the text */}
        {text.split(" ").map((word, index) => (
          <span key={index} className={index % 2 === 0 ? "text-red-500" : "text-blue-500"}>
            {word}{" "}
          </span>
        ))}
      </div>

      {/* Transparent input field */}
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="w-full text-base text-transparent caret-black bg-transparent border border-black relative"
      />
    </div>
  );
};

export default MultiColorInput;

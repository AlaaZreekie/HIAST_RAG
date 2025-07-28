import React from "react";

export const Button = ({ children, className, onClick }) => {
  return (
    <div
      className={`${className} hover:cursor-pointer rounded`}
      onClick={() => {
        if (onClick) {
          console.log("clicked");
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

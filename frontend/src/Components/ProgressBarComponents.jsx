import React from "react";

export const ProgressBarComponents = ({ colorBar, textBar }) => {
  return (
    <div className="progress" role="progressbar">
      <div
        className={` ${
          colorBar ? `progress-bar bg-${colorBar}` : "progress-bar "
        }`}
        style={{ width: "100%" }}
      >
        {textBar}
      </div>
    </div>
  );
};

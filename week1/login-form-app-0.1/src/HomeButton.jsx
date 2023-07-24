import React from "react";

function HomeButton() {
  function handleClick() {
    document.location.href = "/";
  }
  return (
    <div>
      <button className="testBtn" type="button" onClick={handleClick}>
        Sign Out
      </button>
    </div>
  );
}

export default HomeButton;

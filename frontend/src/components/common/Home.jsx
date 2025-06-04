import React from "react";

const homeStyle = {
  marginTop: "50px",
  textAlign: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

export default function Home() {
  return (
    <div style={homeStyle}>
      <h1>Welcome to the Test Series Platform!</h1>
      <p>
        Prepare and practice your knowledge with our curated test series.
        Register or login to get started.
      </p>
    </div>
  );
}

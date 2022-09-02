import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Redirect({ setHeaderVisible }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  setTimeout(function () {
    setHeaderVisible(true);
    navigate("/", { replace: true });
  }, 3000);

  const tick = () => {
    if (count === 0) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setHeaderVisible(false);
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25vh",
        }}
      >
        <div style={{ fontWeight: 700, color: "#ffc107", fontSize: "3vh" }}>
          Page Not Found
        </div>
        <Spinner
          animation="grow"
          variant="warning"
          style={{
            width: "10vh",
            height: "10vh",
            marginTop: "10vh",
          }}
        />

        <div
          style={{
            margin: "10vh",
            justifyContent: "center",
            fontSize: "3.5vh",
            color: "#6c757d",
          }}
        >
          Redirect after {count} seconds
        </div>
      </div>
    </>
  );
}

export default Redirect;

import React, { useEffect, useState } from "react";

type CatPosition = {
  x: number;
  y: number;
};

const FULMINE_COUNT = 20;
const FULMINE_SIZE = 40; // px

const getRandomPosition = (): CatPosition => ({
  x: Math.random() * (window.innerWidth - FULMINE_SIZE),
  y: Math.random() * (window.innerHeight - FULMINE_SIZE),
});

const Gatto: React.FC = () => {
  const [cats, setCats] = useState<CatPosition[]>(
    Array.from({ length: FULMINE_COUNT }, getRandomPosition),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCats((prev) => prev.map(() => getRandomPosition()));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {cats.map((cat, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: cat.x,
            top: cat.y,
            fontSize: FULMINE_SIZE,
            transition: "left 3s linear, top 3s linear",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="yellow"
            className="bi bi-lightning-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
          </svg>
        </div>
      ))}
    </>
  );
};

export default Gatto;

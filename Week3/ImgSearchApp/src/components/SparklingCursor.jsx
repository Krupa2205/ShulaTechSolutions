import { useEffect, useState } from "react";

const SparklingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, movementX, movementY } = e;
      setPosition({ x: clientX, y: clientY });

      // Calculate angle based on cursor movement
      if (movementX !== 0 || movementY !== 0) {
        const newAngle = (Math.atan2(movementY, movementX) * 180) / Math.PI;
        setAngle(newAngle);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="sparkling-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="sparkle" />
      ))}
    </div>
  );
};

export default SparklingCursor;
import React from "react";

interface Props {
  value: number | null;
  index: number;
}

const Tiles: React.FC<Props> = ({ value, index }) => {
  return (
    <div className="tile">
      <span>{value}</span>
    </div>
  );
};

export default Tiles;

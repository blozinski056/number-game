import React from "react";

interface Props {
  value: number;
}

const Tiles: React.FC<Props> = ({ value }) => {
  return (
    <div className="tile">
      <span>{value}</span>
    </div>
  );
};

export default Tiles;

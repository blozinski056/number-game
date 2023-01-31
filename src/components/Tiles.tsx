import React from "react";

interface Props {
  value: number;
  index: number;
  swapTiles: (i: number) => void;
}

const Tiles: React.FC<Props> = ({ value, index, swapTiles }) => {
  return (
    <div className="tile" onClick={() => swapTiles(index)}>
      <span>{value}</span>
    </div>
  );
};

export default Tiles;

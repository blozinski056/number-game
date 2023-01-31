import React from "react";

interface Props {
  value: number;
  index: number;
}

const BlankTile: React.FC<Props> = ({ value, index }) => {
  return <div className="blank-tile"></div>;
};

export default BlankTile;

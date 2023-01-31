import React from "react";

interface Props {
  index: number;
}

const BlankTile: React.FC<Props> = ({ index }) => {
  return <div className="blank-tile"></div>;
};

export default BlankTile;

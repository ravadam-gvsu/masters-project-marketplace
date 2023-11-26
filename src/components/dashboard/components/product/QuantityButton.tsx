import React from "react";
import {Add, Remove} from "@mui/icons-material";

const QuantityButton = ({ onQuant, onRemove, onAdd }: any) => {
  return (
    <div className="amount">
      <button className="minus" onClick={onRemove} disabled={onQuant === 0}>
        <Remove />
      </button>
      <p>{onQuant}</p>
      <button className="plus" onClick={onAdd} disabled={onQuant === 100}>
        <Add />
      </button>
    </div>
  );
};

export default QuantityButton;
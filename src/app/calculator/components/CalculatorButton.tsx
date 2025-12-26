import React from "react";
import classes from "@/app/calculator/page.module.scss";

type CalculatorButtonProps = {
  label: string;
  onClick: () => void;
  spanTwo?: boolean;
};

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, spanTwo }) => {
  return (
    <button
      className={spanTwo ? classes.spanTwo : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
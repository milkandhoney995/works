import React from "react";
import classes from "@/app/calculator/page.module.scss";

type CalculatorButtonProps = {
  label: string;
  onClick: () => void;
  spanTwo?: boolean;
  type?: 'number' | 'operator' | 'special';
  active?: boolean;
};

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, spanTwo, type = 'number', active }) => {
  const buttonClass = `${spanTwo ? classes.spanTwo : ''} ${classes[type]} ${active ? classes.active : ''}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default CalculatorButton;
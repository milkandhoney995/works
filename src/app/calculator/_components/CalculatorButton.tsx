import React from "react";
import clsx from 'clsx';
import classes from "@/app/calculator/page.module.scss";

type CalculatorButtonProps = {
  label: string;
  onClick: () => void;
  spanTwo?: boolean;
  type?: 'number' | 'operator' | 'special';
  active?: boolean;
};

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, spanTwo, type = 'number', active }) => {
  const buttonClass = clsx(classes.calculator__button,
    classes[type], {
      [classes.spanTwo]: spanTwo,
      [classes.active]: active,
    }
  );
  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default CalculatorButton;
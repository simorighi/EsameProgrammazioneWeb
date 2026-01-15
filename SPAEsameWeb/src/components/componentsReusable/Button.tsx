import React, { useState } from "react";


type FontSizeOptions = "fs-1" | "fs-2" | "fs-3" | "fs-4" | "fs-5" | "fs-6";

interface NavigationButtonProps {
  colorBackground: string;
  borderColor: string;
  textColor: string;
  borderWidth?: string;
  contentText: React.ReactNode;
  fontSize?: FontSizeOptions;
}

function NavigationButton(props: NavigationButtonProps) {
  const { colorBackground, borderColor, textColor, contentText, fontSize } = props;


  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={` rounded-0 position-relative overflow-hidden `} 
      style={{
        backgroundColor: isHovered ? textColor : colorBackground,
        borderColor: borderColor,
        color: isHovered ? colorBackground : textColor,
        borderWidth: props.borderWidth || "2px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className={` ${fontSize} pt-2 px-1`}>{contentText}</p>
      <span></span>
    </button>
  );
}

export default NavigationButton;
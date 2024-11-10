import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}

      {isVisible && (
        <div className="absolute bottom-full mb-2 -ml-24 w-52 p-4 bg-[#303134] text-white text-sm rounded-lg shadow-lg z-10">
          {text}
          {/* Tail for the tooltip */}
          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#303134] rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

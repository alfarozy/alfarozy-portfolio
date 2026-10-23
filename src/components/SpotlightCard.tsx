import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface)/90 backdrop-blur-md transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

import React from "react";

interface LetterBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  set?: boolean;
  inUse?: boolean;
  inPosition?: boolean;
  autoFocus?: boolean;
  value?: string;
  disabled?: boolean;
}

export const LetterBox = ({
  value,
  set = false,
  inUse,
  inPosition,
  autoFocus,
  disabled,
  ...rest
}: LetterBoxProps) => {
  return (
    <input
      ref={(el) => {
        if (el && autoFocus) {
          el.focus();
        }
      }}
      disabled={disabled}
      value={value || ""}
      type="text"
      autoFocus={autoFocus}
      maxLength={1}
      className={`flex uppercase text-center font-mono font-bold text-2xl focus:outline-none rounded-md focus:ring-cyan-500 focus:border-cyan-500 
      ${disabled && "opacity-70"} 
      ${!set && "bg-slate-700"} 
      ${set && !inUse && "bg-slate-400"} 
      ${inUse && "bg-yellow-400"} 
      ${inPosition && "bg-green-400"}`}
      {...rest}
    />
  );
};
1;

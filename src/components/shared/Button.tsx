import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
        select-none
        rounded-md 
        border-[2px]
        border-borderGray
        px-8
        py-1
        font-medium
        text-white
        transition
        hover:bg-borderGray
        active:bg-mainDark
      `,
          disabled && "opacity-75 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;

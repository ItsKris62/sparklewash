// src/components/ui/Button.js

import { forwardRef } from "react";

const Button = forwardRef(({ variant = 'primary', className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`btn ${variant} ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
});

export default Button;
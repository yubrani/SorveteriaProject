import { deleteProduct } from "../lib/actions/products_actions";
import clsx from "clsx";

import { ButtonHTMLAttributes } from "react";



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
};
export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
  };
  const combinedClassName = clsx(baseStyles, variantStyles[variant], className);
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}



export function UpdateProductsButton({
  children,
  className,
  variant = "primary",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        {
          "opacity-50 cursor-not-allowed": disabled || loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}


type Props = {
  id: number;
  className?: string;
  children?: React.ReactNode;
};

export function DeleteProductButton({
  id,
  className,
  children,
}: Props) {
  const deleteAction = deleteProduct.bind(null, id);

  return (
    <form action={deleteAction}>
      <button
        type="submit"
        className={clsx(
          // base
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",

          // estilo danger 🔥
          "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg",

          // interacción
          "focus:outline-none focus:ring-2 focus:ring-red-400",

          // efecto click
          "active:scale-95",

          className
        )}
      >
        {children || "Delete"}
      </button>
    </form>
  );
}


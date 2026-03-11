"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/utils";
import React from "react";

type CommonProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({ variant = "primary", className, children, ...props }: ButtonProps) => {
  const isPrimary = variant === "primary";
  const classes = cn(
    "inline-flex items-center justify-center rounded-[999px] px-7 py-4 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
    isPrimary
      ? "bg-accent text-white hover:bg-brand focus:ring-brand/30"
      : "bg-secondary-bg text-foreground hover:bg-[#E3DDD1] focus:ring-[#CFC5B5]",
    className
  );

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;

    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={classes}
        {...(anchorProps as any)}
      >
        {children}
      </motion.a>
    );
  }

  const btnProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <motion.button
      type={btnProps.type ?? "button"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={classes}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

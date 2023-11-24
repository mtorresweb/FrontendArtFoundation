import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export function TypographyH2(props: Props) {
  return (
    <h2
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${props.className}`}
    >
      {props.children}
    </h2>
  );
}

export function TypographyH4(props: Props) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${props.className}`}
    >
      {props.children}
    </h4>
  );
}

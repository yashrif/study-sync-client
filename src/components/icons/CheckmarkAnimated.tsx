"use client";

import { Variants, motion } from "framer-motion";
import { Suspense } from "react";

type Props = {
  stroke?: string;
  className?: string;
};

export const CheckmarkAnimated: React.FC<Props> = ({
  stroke = "hsl(var(--primary))",
  className = "",
}) => {
  return (
    <Suspense fallback={null}>
      <Icon
        variants={[drawVariantsCircle, drawVariantsCheckmark]}
        className={className}
        stroke={stroke}
      />
    </Suspense>
  );
};

type PropsType = {
  stroke?: string;
  variants: Variants[];
  className: string;
};

const Icon: React.FC<PropsType> = ({ stroke, variants, className }) => {
  return (
    <motion.svg
      width={"auto"}
      height={24}
      viewBox="0 0 38 36"
      fill="none"
      stroke={stroke}
      strokeWidth={3}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      whileInView="visible"
    >
      <motion.path
        d="M23.3837 2.93298C20.1465 1.77624 16.6227 1.69292 13.3344 2.69535C10.0461 3.69778 7.1681 5.73266 5.12665 8.49859C3.0852 11.2645 1.98889 14.6144 2.00008 18.0521C2.01128 21.4898 3.12939 24.8325 5.18881 27.5851C7.24823 30.3376 10.1394 32.3537 13.4342 33.3347C16.729 34.3157 20.2521 34.2094 23.4818 33.0316C26.7114 31.8538 29.4758 29.6672 31.3656 26.7955C33.2554 23.9238 34.17 20.5198 33.974 17.0876"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={variants[0]}
      />
      <motion.path
        d="M9 15L18 24L36 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={variants[1]}
      />
    </motion.svg>
  );
};

const drawVariantsCircle = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 2,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 2,
      opacity: { duration: 0 },
    },
  },
};

const drawVariantsCheckmark = {
  hidden: drawVariantsCircle.hidden,
  visible: {
    ...drawVariantsCircle.visible,
    transition: {
      ...drawVariantsCircle.visible.transition,
      opacity: {
        ...drawVariantsCircle.visible.transition.opacity,
        delay: 0.95,
      },
      delay: 0.95,
      ease: "easeOut",
    },
  },
};

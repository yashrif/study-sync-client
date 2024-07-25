import { SVGProps } from "react";

export * from "./CheckmarkAnimated";

export const CircleCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={38}
    height={36}
    viewBox="0 0 38 36"
    fill="none"
    stroke="hsl(var(--primary))"
    strokeWidth={3}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.3837 2.93298C20.1465 1.77624 16.6227 1.69292 13.3344 2.69535C10.0461 3.69778 7.1681 5.73266 5.12665 8.49859C3.0852 11.2645 1.98889 14.6144 2.00008 18.0521C2.01128 21.4898 3.12939 24.8325 5.18881 27.5851C7.24823 30.3376 10.1394 32.3537 13.4342 33.3347C16.729 34.3157 20.2521 34.2094 23.4818 33.0316C26.7114 31.8538 29.4758 29.6672 31.3656 26.7955C33.2554 23.9238 34.17 20.5198 33.974 17.0876"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 15L18 24L36 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DoubleArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const DoubleArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const Quiz = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 10H2M10 1V2M18 10H19M3.6 3.6L4.3 4.3M16.4 3.6L15.7 4.3M7.7 15H12.3M9 8.93683C9 8.68837 9.11516 8.45008 9.32016 8.27439C9.52515 8.0987 9.80319 8 10.0931 8H10.4054C10.6953 8 10.9733 8.0987 11.1783 8.27439C11.3833 8.45008 11.4985 8.68837 11.4985 8.93683C11.51 9.13958 11.4553 9.34057 11.3426 9.50954C11.23 9.67851 11.0655 9.8063 10.8739 9.87366C10.6823 9.96348 10.5178 10.1339 10.4051 10.3592C10.2924 10.5844 10.2377 10.8524 10.2492 11.1228M10.2492 12.3719V12.375M7 14C6.16047 13.3704 5.54033 12.4925 5.22743 11.4908C4.91453 10.4892 4.92473 9.41442 5.25658 8.41886C5.58844 7.4233 6.22512 6.55739 7.07645 5.94379C7.92778 5.33019 8.95059 5 10 5C11.0494 5 12.0722 5.33019 12.9236 5.94379C13.7749 6.55739 14.4116 7.4233 14.7434 8.41886C15.0753 9.41442 15.0855 10.4892 14.7726 11.4908C14.4597 12.4925 13.8395 13.3704 13 14C12.6096 14.3865 12.3156 14.8594 12.1419 15.3806C11.9681 15.9018 11.9195 16.4566 12 17C12 17.5304 11.7893 18.0391 11.4142 18.4142C11.0391 18.7893 10.5304 19 10 19C9.46957 19 8.96086 18.7893 8.58579 18.4142C8.21071 18.0391 8 17.5304 8 17C8.08046 16.4566 8.03185 15.9018 7.85813 15.3806C7.6844 14.8594 7.39043 14.3865 7 14Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

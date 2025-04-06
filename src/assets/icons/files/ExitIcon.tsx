import { IconProps } from '../iconTypes';

export const ExitIcon = ({
  size = 24,
  strokeWidth = 2,
  color = 'var(--icon_color)',
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 4H16C16.5304 4 17.0391 4.21071 17.4142 4.58579C17.7893 4.96086 18 5.46957 18 6V20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 20H5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 20H22"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12V12.01"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 4.56195V20.719C13 20.8708 12.9653 21.0207 12.8987 21.1573C12.8321 21.2938 12.7352 21.4133 12.6155 21.5068C12.4958 21.6003 12.3564 21.6653 12.2078 21.6968C12.0592 21.7284 11.9054 21.7257 11.758 21.689L5 20V5.56195C5.00007 5.11596 5.1492 4.68279 5.42371 4.33128C5.69821 3.97978 6.08232 3.73011 6.515 3.62195L10.515 2.62195C10.8098 2.54828 11.1174 2.54272 11.4146 2.60571C11.7118 2.66869 11.9908 2.79857 12.2303 2.98547C12.4699 3.17237 12.6637 3.41138 12.797 3.68437C12.9304 3.95735 12.9998 4.25813 13 4.56195Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

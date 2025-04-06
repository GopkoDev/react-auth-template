import { IconProps } from '../iconTypes';

export const JarIcon = ({
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
        d="M6 2L17 2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 2V4.789C6.99997 5.57879 6.64923 6.3509 5.992 7.008L5.008 7.992C4.35048 8.64939 3.99973 9.42187 4 10.212V20C4 20.5304 4.31607 21.0391 4.87868 21.4142C5.44129 21.7893 6.20435 22 7 22H16C16.7956 22 17.5587 21.7893 18.1213 21.4142C18.6839 21.0391 19 20.5304 19 20V10.211C19 9.42121 18.6492 8.6491 17.992 7.992L17.008 7.008C16.3505 6.35061 15.9997 5.57813 16 4.788V2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15.4999C6.02931 15.1699 7.13408 15 8.25 15C9.36592 15 10.4707 15.1699 11.5 15.4999C12.5293 15.83 13.6341 16 14.75 16C15.8659 16 16.9707 15.83 18 15.4999"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

import { FC } from "react";

export interface VerticalDotsIconProps {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
  as?: string;
}

export const VerticalDotsIcon: FC<VerticalDotsIconProps> = (props) => {
  const { size, height, width } = props;

  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

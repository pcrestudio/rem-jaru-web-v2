import { FC, SVGProps } from "react";

interface MicrosoftIconProps extends SVGProps<SVGSVGElement> {
  fill?: string;
  size?: number | string;
  height?: number | string;
  width?: number | string;
}

export const MicrosoftIcon: FC<MicrosoftIconProps> = ({
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 256 256"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M121.666 121.666H0V0h121.666z" fill="#f1511b" />
      <path d="M256 121.666H134.335V0H256z" fill="#80cc28" />
      <path d="M121.663 256.002H0V134.336h121.663z" fill="#00adef" />
      <path d="M256 256.002H134.335V134.336H256z" fill="#fbbc09" />
    </svg>
    // <svg
    //   data-name="Iconly/Curved/Profile"
    //   height={size || height || 24}
    //   viewBox="0 0 24 24"
    //   width={size || width || 24}
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <g
    //     fill="none"
    //     stroke={fill}
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     strokeMiterlimit={10}
    //     strokeWidth={1.5}
    //   >
    //     <path
    //       d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
    //       data-name="Stroke 1"
    //     />
    //     <path
    //       d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
    //       data-name="Stroke 3"
    //     />
    //   </g>
    // </svg>
  );
};

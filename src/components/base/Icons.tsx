import React from "react"

export type IconSize = 12 | 14 | 16 | 18 | 19 | 20 | 22 | 24

export const ArrowLeft = ({ size = 24 }: { size?: IconSize }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.08569 11.9999L6.7928 11.2928L14.2928 3.7928L14.9999 3.08569L16.4141 4.49991L15.707 5.20701L8.91412 11.9999L15.707 18.7928L16.4141 19.4999L14.9999 20.9141L14.2928 20.207L6.7928 12.707L6.08569 11.9999Z"
      fill="currentColor"
    />
  </svg>
)

export const ArrowRight = ({ size = 24 }: { size?: IconSize }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9138 11.9998L8.99976 20.9138L7.58569 19.4998L15.0857 11.9998L7.58569 4.49979L8.99976 3.08572L17.9138 11.9998Z"
      fill="currentColor"
    />
  </svg>
)

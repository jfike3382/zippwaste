export default function Icon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M11.9998 6C11.3371 6 10.7998 6.53726 10.7998 7.2C10.7998 7.86274 11.3371 8.4 11.9998 8.4C12.6625 8.4 13.1998 7.86274 13.1998 7.2C13.1998 6.53726 12.6625 6 11.9998 6Z"
        fill="white"
      />
      <path
        d="M13.1998 12C13.1998 11.3373 12.6625 10.8 11.9998 10.8C11.3371 10.8 10.7998 11.3373 10.7998 12V16.8C10.7998 17.4627 11.3371 18 11.9998 18C12.6625 18 13.1998 17.4627 13.1998 16.8V12Z"
        fill="white"
      />
    </svg>
  );
}

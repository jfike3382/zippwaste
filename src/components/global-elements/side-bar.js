export default function SideBar({
  position = "left",
  scroll = false,
  children,
}) {
  const variantStyles = {
    left: "border-r border-black mobile-hidden",
    right: "border-l border-black tablet-hidden mobile-hidden",
  };

  return (
    <div
      className={`flex flex-col w-[16.25rem] min-w-[16.25rem] max-w-[15rem] h-full p-4 ${
        variantStyles[position]
      } ${scroll ? "overflow-y-auto" : ""}`}
    >
      {children}
    </div>
  );
}

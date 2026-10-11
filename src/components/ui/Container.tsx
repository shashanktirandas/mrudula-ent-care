interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "standard" | "wide" | "full";
}

const sizes = {
  narrow: "max-w-3xl",
  standard: "max-w-[1280px]",
  wide: "max-w-[1440px]",
  full: "max-w-none",
};

export default function Container({
  children,
  className = "",
  size = "standard",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizes[size]} ${className}`}
    >
      {children}
    </div>
  );
}
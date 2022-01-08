export default function Container({ children, center }) {
  return <div className={`container md:py-28 py-24 ${center ? "px-4 lg:px-10 mx-auto" : " mx-auto lg:px-16 px-6"}`}>{children}</div>;
}

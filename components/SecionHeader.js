export default function SectionHeader({ children, author }) {
  return <h1 className={`text-center text-3xl text-black font-semibold ${author ? "pt-6 pb-2" : "py-6"}`}>{children}</h1>;
}

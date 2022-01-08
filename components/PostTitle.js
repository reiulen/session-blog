import Link from "next/link";

export default function PostTitle({ slugcategory, category, title, date, slug, center }) {
  return (
    <>
      <div className="flex items-center text-muted font-semibold text-black/50 space-x-2">
        <Link href={`/kategori/${slugcategory}`}>
          <a>
            <div className={`uppercase ${center ? "md:text-sm text-xs" : "text-xs"}`}>{category}</div>
          </a>
        </Link>
        <span>&bull;</span>
        <div className={`${center ? "md:text-sm text-xs" : "text-xs"}`}>{date}</div>
      </div>
      <h1 className={` font-semibold text-black/75 hover:text-blue-500  ${center ? "md:text-4xl text-base" : "text-xl"}`}>
        <Link href={`/${slug}`}>
          <a>{title}</a>
        </Link>
      </h1>
    </>
  );
}

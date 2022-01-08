import Link from "next/link";

export default function PostAuthor({ authorAvatar, authorNama, views }) {
  return (
    <>
      <Link href={`/author/${authorNama}`}>
        <a>
          <div className="flex items-center mt-3 md:my-3 ml-2 text-black/60">
            <img src={`${process.env.NEXT_PUBLIC_APIASSET + authorAvatar}`} className="md:w-8 md:h-8 w-6 h-6 rounded-full object-cover" />
            <div className="ml-2">
              <h5 className="md:text-sm text-sm">{authorNama}</h5>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}

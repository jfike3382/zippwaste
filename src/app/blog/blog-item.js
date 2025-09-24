import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/format-data/date";

export default function BlogItem({ blogpost }) {
  return (
    <Link className="w-full" href={`/blog/${blogpost.slug}`}>
      <div className="flex flex-col gap-16">
        <div className="flex flex-row gap-6 items-center max-md:flex-col max-md:items-start">
          <Image
            src={blogpost.image.url}
            alt={blogpost.name}
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-[2rem]"
          />
          <div className="flex flex-col gap-3">
            <h2 className="title-m">{blogpost.name}</h2>
            <p className=" line-clamp-1">{blogpost.subtitle}</p>
            <p className="paragraph-s text-secondary">
              {formatDate(blogpost.created_at)}
            </p>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </Link>
  );
}

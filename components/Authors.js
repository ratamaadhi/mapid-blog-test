import Image from "next/image";
import React, { useEffect, useState } from "react";
import { myLoader, shimmer, toBase64 } from "../lib/media";
import MomentMini from 'moment-mini'
import useInnerWidth from "../lib/hooks/useInnerWidth";

function Author({ blog, ...props }) {
  const { authors } = blog;
  const { windowWidth } = useInnerWidth()

  return (
    <div className="mt-[30px] flex items-center">
      <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-xl border-2 border-gray-500/80">
        <Image
          loader={myLoader}
          src={authors[0].user?.profile_picture.url_compressed??authors[0].user?.profile_picture.url??'https://doc.mapid.io/static/media/profile_pic_comment.2a6f2a32.svg'}
          alt={authors[0].user?.profile_picture.name??'null'}
          layout="fill"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(windowWidth, "auto")
          )}`}
          className="object-cover z-10"
        />
      </div>
      <div className="flex flex-col justify-center ml-[10px]">
        <div>{authors[0].user?.full_name??authors[0].user?.name??''}</div>
        <div className="text-[12px]">{MomentMini(authors[0].join_at).format("MMM DD YYYY")}</div>
      </div>
    </div>
  );
}

export default Author;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { myLoader, shimmer, toBase64 } from "../../lib/media";

function Hero({ blog, ...props }) {
  const [windowWidth, setWindowWidth] = useState("");

  const data = JSON.parse(blog.editorState);
  const coverBlog = Object.keys(data.entityMap)
    .map((a) => data.entityMap[a] ?? [])
    .filter((fil) => fil.type === "image")[0]?.data;

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
  }, [windowWidth]);

  function handleResizeWindow(e) {
    setWindowWidth(window.innerWidth);
  }

  return (
    <div className="relative w-full min-h-[500px]">
      {coverBlog && (
        <Image
          loader={myLoader}
          src={coverBlog}
          alt={blog.title}
          layout="fill"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(windowWidth, "auto")
          )}`}
          className="object-cover z-10"
        />
      )}
      <div className="h-full w-full opacity-1 bg-gradient-to-t from-[#00f260] to-[#0575e6]  z-0 absolute bottom-0 left-0"></div>
      <div className="h-3/5 w-full opacity-1 bg-gradient-to-t from-white z-10 absolute bottom-0 left-0"></div>
      <div className="absolute top-[70%] -translate-y-1/2 z-20 font-bold leading-[110%] text-3xl md:text-[50px] xl:text-[65px] px-[10px] md:px-[30px] xl:px-[100px]">
        <strong>{blog.title}</strong>
      </div>
    </div>
  );
}

export default Hero;

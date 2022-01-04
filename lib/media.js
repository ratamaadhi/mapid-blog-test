import NextImage from "next/image";

function myLoader(load) {
  return `${load.src}?w=${load.width}&q=${load.quality || 75}`;
}

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

function CustomImage(props) {
  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden">
      {/* <NextImage
        loader={myLoader}
        src={authors[0].user.profile_picture.url_compressed}
        alt={authors[0].user.profile_picture.name}
        layout="fill"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(windowWidth, "auto")
        )}`}
        className="object-cover z-10"
      /> */}
    </div>
  );
}

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === "atomic") {
    return {
      component: CustomImage,
      editable: false,
      props: {
        foo: "bar",
      },
    };
  }
}

const Image = (props) => {
  if (props.src) {
    return (
      <img
        src={props.src}
        style={{
          maxWidth: "90%",
          maxHeight: "70vh",
          marginBottom: "1em",
        }}
        className="object-contain mx-auto"
      />
    );
  }
  return null;
};

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src, link_url } = entity.getData();
  const type = entity.getType();

  let mediaImage = <Image src={"./favicon.png"} />;
  if (type === "image") {
    mediaImage = <Image src={src} />;
  }

  if (type === "link") {
    mediaImage = (
      <a style={{ color: "#007bff", textDecoration: "none" }} href={link_url}>
        {link_url}
      </a>
    );
  }
  return mediaImage;
};

const mediaBlockRenderer = (block) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
};

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'superFancyBlockquote';
  }
}

export { myLoader, toBase64, shimmer, myBlockRenderer, mediaBlockRenderer, myBlockStyleFn };

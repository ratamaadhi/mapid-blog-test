import React from "react";
import Head from "next/head";

const Seo = ({ blog, ...props }) => {
  return (
    <Head>
      {blog.title ? (
        <>
          <title>{blog.title}</title>
          <meta name="description" content={`MAPID | ${blog.title}`} />
        </>
      ) : (
        <title>MAPID (Multi Areal Planing Indonesia)</title>
      )}
      {blog.authors[0].user?.full_name||blog.authors[0].user?.name && (
        <meta name="author" content={blog.authors[0].user?.full_name??blog.authors[0].user?.name} />
      )}
    </Head>
  );
};

export default Seo;

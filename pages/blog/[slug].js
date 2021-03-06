import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Hero from "../../components/Hero";
import Seo from "../../components/Seo";
import { blogsApi } from "../../lib/api";
import { GlobalContext } from "../../appContext";
import MainContainer from "../../components/Layout/MainContainer";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import Author from "../../components/Authors";
import { mediaBlockRenderer, myBlockStyleFn } from "../../lib/media";
import useBlogs from "../../lib/hooks/useBlogs";
import useToggleList from "../../lib/hooks/useToggleList";
import ListBlogs from "../../components/Layout/ListBlogs";
import ToggleList from "../../components/Layout/ToggleList";
import useScroll from "../../lib/hooks/useScroll";

function Slug({ blog, ...props }) {
  const router = useRouter();
  const { slug } = router.query;
  const { newBlog } = useBlogs(slug);
  const { open, setOpen } = useToggleList()
  const { scrollY } = useScroll();

  const data = JSON.parse(blog.editorState??newBlog.editorState);
  const contentState = convertFromRaw(data);
  const editorState = EditorState.createWithContent(contentState);

  return (
    <>
      <Seo blog={blog ?? newBlog} />
      <Hero blog={blog ?? newBlog} />
      <ListBlogs open={open} scrollY={scrollY} />
      <ToggleList open={open} setOpen={setOpen} scrollY={scrollY} />
      <MainContainer>
        <Author blog={blog ?? newBlog} />
        <div className="p-[15px] mx-[-15px] text-lg text-gray-700">
          <Editor
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={myBlockStyleFn}
            editorKey="editor"
            editorState={editorState}
            readOnly={true}
          />
        </div>
      </MainContainer>
    </>
  );
}

export async function getStaticPaths() {
  const res = await blogsApi();
  const slug = await res.data;
  const paths = slug.map((slg) => ({
    params: { slug: slg.link },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const res = await blogsApi();
  const blogs = await res.data;
  const blog = blogs.filter((blg) => blg.link === ctx.params.slug)[0];
  return {
    props: {
      blog,
    },
  };
}

export default Slug;

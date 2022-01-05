import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useState } from "react";
import Author from "../components/Authors";
import Hero from "../components/Hero";
import ListBlogs from "../components/Layout/ListBlogs";
import MainContainer from "../components/Layout/MainContainer";
import ToggleList from "../components/Layout/ToggleList";
import Seo from "../components/Seo";
import { blogsApi } from "../lib/api";
import useBlogs from "../lib/hooks/useBlogs";
import useScroll from "../lib/hooks/useScroll";
import useToggleList from "../lib/hooks/useToggleList";
import { mediaBlockRenderer, myBlockStyleFn } from "../lib/media";

function Home({ blog, ...props }) {
  const { newBlog } = useBlogs();
  const { open, setOpen } = useToggleList()
  const { scrollY } = useScroll();

  const data = JSON.parse(blog.editorState??newBlog.editorState);
  const contentState = convertFromRaw(data);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

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

export async function getStaticProps(ctx) {
  const res = await blogsApi();
  const blogs = await res.data;
  const blog = blogs[0];
  return {
    props: {
      blog,
    },
  };
}

export default Home;

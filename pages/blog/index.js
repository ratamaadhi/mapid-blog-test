import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../appContext";
import Author from "../../components/Authors";
import Hero from "../../components/Hero";
import MainContainer from "../../components/Layout/MainContainer";
import Seo from "../../components/Seo";
import { blogsApi } from "../../lib/api";
import { mediaBlockRenderer, myBlockStyleFn } from "../../lib/media";

function Home({ blog, ...props }) {
  const [newBlog, setNewBlog] = useState("");
  const { getBlogs } = useContext(GlobalContext);

  const data = JSON.parse(blog.editorState);
  const contentState = convertFromRaw(data);
  const editorState = EditorState.createWithContent(contentState);

  useEffect(() => {
    blogsApi().then((res) => {
      getBlogs(res.data);
      setNewBlog(res.data[0]);
    });
  }, []);
  return (
    <>
      <Seo blog={blog ?? newBlog} />
      <Hero blog={blog ?? newBlog} />
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

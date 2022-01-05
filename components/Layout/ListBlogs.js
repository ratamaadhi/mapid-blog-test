import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../../appContext";
import useScroll from "../../lib/hooks/useScroll";

const ListBlogs = ({ open, scrollY }) => {
  const { blogs } = useContext(GlobalContext);
  const subBrackets = blogs.map((data) => data.sub_bracket);
  const listSubBrackets = [...new Set(subBrackets)].map((sub) => {
    const filterSub = blogs.filter((blog) => blog.sub_bracket === sub);
    return { sub_bracket: sub, filterSub };
  });
  
  return (
    <div
      className={`fixed flex flex-col justify-start items-center ${
        open ? "left-[2%]" : "left-[-300px]"
      } ${
        scrollY ? "top-[100px]" : "top-[450px]"
      } h-[80vh] w-[300px] max-w-[80vw] rounded-2xl bg-[#e4e4e4] text-white z-20 transition-all delay-100 duration-500 ease-in-out shadow-lg pt-10 px-[18px] overflow-y-scroll border border-gray-400/20 pb-96`}
    >
      <div className="py-2 px-6 rounded-3xl text-center text-gray-800 bg-white text-sm">
        BLOG
      </div>
      {listSubBrackets &&
        listSubBrackets
          .sort((a, b) =>
            a.sub_bracket < b.sub_bracket
              ? -1
              : a.sub_bracket > b.sub_bracket
              ? 1
              : 0
          )
          .map((data, i) => {
            return (
              <div key={i} className="flex flex-col justify-start items-center gap-y-2 w-full h-auto">
                <div className="mt-5 w-full h-auto bg-[#2196f3] text-white px-[10px] py-2 rounded-lg text-sm">
                  {data.sub_bracket.split("_").join(" ").toUpperCase()}
                </div>
                {data.filterSub.map((subData) => 
                  <Link key={subData._id} href={`/blog/${subData.link}`}>
                    <a className="relative w-full h-auto text-gray-700/90 bg-white px-[10px] py-2 rounded-lg shadow-sm leading-[12.5pt] tracking-wide text-sm border border-gray-500/30">{subData.title}</a>
                  </Link>
                )}
              </div>
            );
          })}
    </div>
  );
};

export default ListBlogs;

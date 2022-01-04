import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../appContext";
import { blogsApi } from "../api";

const useBlogs = (slug) => {
  const { getBlogs } = useContext(GlobalContext);
  const [newBlog, setNewBlog] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    blogsApi()
      .then((res) => {
        getBlogs(res.data);
        if (slug) {
          setNewBlog(res.data.filter((fil) => fil.link === slug)[0]);
        } else {
          setNewBlog(res.data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return { newBlog, isLoading, isError };
};

export default useBlogs

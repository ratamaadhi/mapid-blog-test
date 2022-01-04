import axios from 'axios'

const blogsApi = () => {
  return axios.get("https://api.mapid.io/blog/get_list_docs_public/blog")
};

export { blogsApi };

import { createContext, useReducer } from "react";


const initialState = {
  blogs: []
}
const GlobalContext = createContext(initialState);

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return {
        ...state,
        blogs: action.payload,
      };
    default:
      return state;
  }
};

const GlobalContextProv = ({children, ...props}) => {
  const { global } = props
  const [state, dispatch] = useReducer(appReducer, { blogs: global });
  function getBlogs(data){
    dispatch({
      type: 'GET_BLOGS',
      payload: data
    })
  }

  return (
    <GlobalContext.Provider value={{ blogs: global, getBlogs }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { appReducer, GlobalContextProv, GlobalContext };

import Axios from "axios";
// Axios.defaults.withCredentials = false;

export const setDataBlog = (page) => (dispatch) => {
  Axios.get(`http://localhost:4000/v1/blog/posts?page=${page}&perPage=2`)
    .then((result) => {
      const responseAPI = result.data;
      // console.log("data API: ", responseAPI);
      dispatch({ type: "UPDATE_DATA_BLOG", payload: responseAPI.data });
      dispatch({
        type: "UPDATE_PAGE",
        payload: {
          currentPage: responseAPI.current_page,
          totalPage: Math.ceil(responseAPI.total_data / responseAPI.per_Page),
        },
      });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

//   return { type: "UPDATE_DATA_BLOG", payload: payload };
//   return { type: "UPDATE_DATA_BLOG", payload };

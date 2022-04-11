import { combineReducers } from "redux";
import globalReducer from "./globalRedcuer";
import homeReducer from "./homeReducer";
import createBlogReducer from "./createBlogReducer";

const reducer = combineReducers({
  homeReducer,
  globalReducer,
  createBlogReducer,
});

export default reducer;

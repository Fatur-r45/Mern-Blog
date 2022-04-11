const initialState = {
  name: "Fatur",
};

const globalReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_NAME") {
    return {
      ...state,
      name: "Rivna",
    };
  }
  return state;
};

export default globalReducer;

const initialState = {
  active: 0,
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_Tab":
      return {
        ...state,
        active: action.payload,
      };

    default:
      return state;
  }
};

export default navbarReducer;

const initialState = {
  name: "",
  department: "Stratergy",
  startDate: "",
  endDate: "",
  type: "Internal",
  priority: "High",
  location: "Pune",
  category: "Quality A",
  reason: "Business",
  division: "Compressor",
};

const tempReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Change":
      return {
        ...state,
        ...action.payload,
      };

    case "Reset":
      return initialState;

    default:
      return state;
  }
};

export default tempReducer;

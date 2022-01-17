const initialState = {
  filters: {
    department: "All",
    location: "All",
    priority: "All",
    pageNo: 1,
  },
  TotalPages: 1,
  searchValue: "",
  isLoading: true,
  projects: [],
  page: 0,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "changeFilter":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        isLoading: true,
      };

    case "loadProjects":
      return {
        ...state,
        projects: action.payload.projects,
        pages: action.payload.pages,
        isLoading: false,
      };
    case "setLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "changeSearch":
      return {
        ...state,
        searchValue: action.payload,
      };

    case "Reset":
      return initialState;

    default:
      return state;
  }
};

export default projectReducer;

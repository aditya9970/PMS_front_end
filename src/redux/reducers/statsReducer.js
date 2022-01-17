const initialState = {
  isChanged: true,
  Registered: 0,
  Closed: 0,
  Running: 0,
  ClosureDelay: 0,
  Cancelled: 0,
  Registration: [
    {
      _id: "strategy",
      registered: 0,
      completed: 0,
    },
    {
      _id: "finance",
      registered: 0,
      completed: 0,
    },
    {
      _id: "quality",
      registered: 0,
      completed: 0,
    },
    {
      _id: "maintainance",
      registered: 0,
      completed: 0,
    },
    {
      _id: "stores",
      registered: 0,
      completed: 0,
    },
    {
      _id: "hr",
      registered: 0,
      completed: 0,
    },
  ],
};

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UpdateStatsGraph":
      return {
        ...state,
        Registration: action.payload,
        isChanged: false,
      };
    case "UpdateStats":
      return {
        ...state,
        ...action.payload,
      };
    case "ForceUpdate":
      return {
        ...state,
        isChanged: true,
      };

    default:
      return state;
  }
};

export default statsReducer;

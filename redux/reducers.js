const initialState = {
  clockedIn: false,
  user: {
    name: "",
    email: "",
    role: "",
    project: "",
  },
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOCKIN":
      return {
        ...state,
        clockedIn: true,
      };
    case "CLOCKOUT":
      return {
        ...state,
        clockedIn: false,
      };
    case "SETUSER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "RESETUSER": {
      return {
        ...state,
        user: initialState.user,
      };
    }
    default:
      return state;
  }
};

export default counterReducer;

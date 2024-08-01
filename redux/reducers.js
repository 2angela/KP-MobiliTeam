import {
  taskFormat,
  bbmFormat,
  copFormat,
  aorFormat,
  siteFormat,
} from "../data/inputFormat";

const initialState = {
  clockedIn: false,
  user: {
    name: "",
    email: "",
    role: "",
    project: "",
  },
  task: taskFormat,
  bbm: bbmFormat,
  cop: copFormat,
  aor: aorFormat,
  site: siteFormat,
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
    case "SAVETASK":
      return {
        ...state,
        task: { ...state.task, ...action.payload },
      };
    case "SAVEBBM":
      return {
        ...state,
        bbm: { ...state.bbm, ...action.payload },
      };
    case "SAVECOP":
      return {
        ...state,
        cop: { ...state.cop, ...action.payload },
      };
    case "SAVEAOR":
      return {
        ...state,
        aor: { ...state.aor, ...action.payload },
      };
    case "SAVESITE":
      return {
        ...state,
        site: { ...state.site, ...action.payload },
      };
    default:
      return state;
  }
};

export default counterReducer;

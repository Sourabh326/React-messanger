import { authConstants } from "../action/constant";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case `${authConstants.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case `${authConstants.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${authConstants.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticating: false,
        authenticated: false,
        error: action.payload.error,
      };
      break;
    case `${authConstants.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstants.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initialState,
      };
      break;
    case `${authConstants.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }
  return state;
};

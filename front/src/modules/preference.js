const SET_PRIFERENCE = "preference/SET_PRIFERENCE";

export const setPreference = (preference) => ({
  type: SET_PRIFERENCE,
  payload: preference,
});

const initialState = {
  payload: null,
};

export default function preference(state = initialState, action) {
  switch (action.type) {
    case SET_PRIFERENCE:
      return {
        payload: action.payload,
      };
    default:
      return state;
  }
}

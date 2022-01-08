import { categories } from "../data/categories";

const SET_DISLIKE = "preference/SET_DISLIKE";
const SET_LIKE = "preference/SET_LIKE";

export const setDislike = (category) => ({
  type: SET_DISLIKE,
  category,
});

export const setLike = (category) => ({
  type: SET_LIKE,
  category,
});

const initialState = {
  categories,
};

export default function preference(state = initialState, action) {
  let now;
  switch (action.type) {
    case SET_DISLIKE:
      now = state.categories[action.category];
      return {
        categories: {
          ...state.categories,
          [action.category]: now === 0 ? 2 : now === 2 ? 0 : now,
        },
      };
    case SET_LIKE:
      now = state.categories[action.category];
      return {
        categories: {
          ...state.categories,
          [action.category]: now === 0 ? 1 : now === 1 ? 0 : now,
        },
      };
    default:
      return state;
  }
}

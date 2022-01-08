import { categories } from "../data/categories";

const SET_DISLIKE = "preference/SET_DISLIKE";
const SET_LIKE = "preference/SET_LIKE";

export const setDislike = (category, now) => ({
  type: SET_DISLIKE,
  category,
  now,
});

export const setLike = (category, now) => ({
  type: SET_LIKE,
  category,
  now,
});

const initialState = {
  categories,
};

export default function preference(state = initialState, action) {
  switch (action.type) {
    case SET_DISLIKE:
      return {
        categories: {
          ...state.categories,
          [action.category]:
            action.now === 0 ? 2 : action.now === 2 ? 0 : action.now,
        },
      };
    case SET_LIKE:
      return {
        categories: {
          ...state.categories,
          [action.category]:
            action.now === 0 ? 1 : action.now === 1 ? 0 : action.now,
        },
      };
    default:
      return state;
  }
}

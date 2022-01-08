export const reducerUtils = {
  initial: () => ({
    loading: false,
    data: null,
    error: null,
  }),
  loading: () => ({
    loading: true,
    data: null,
    error: null,
  }),
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  error: (error) => ({
    loading: false,
    data: null,
    error: error,
  }),
};

/*
 *
 * HomePage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { homePageSaga } from './saga';
import { HomePageState } from './types';

export const initialState: HomePageState = {
  data: [],
  loading: false,
  success: false,
  failure: false,
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    get(state) {
      state.loading = true;
      state.success = false;
      state.failure = false;
    },
    getSuccess(state, actions) {
      state.data = actions.payload;
      state.loading = false;
      state.success = true;
      state.failure = false;
    },
    getFailure(state) {
      state.loading = false;
      state.success = false;
      state.failure = true;
    },
  },
});

export const { actions } = slice;

export const homePageSlice = { key: slice.name, actions: slice.actions, reducer: slice.reducer, saga: homePageSaga };

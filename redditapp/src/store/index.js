import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mainRedditReducer from './mainRedditSlice';
import subRedditReducer from './subRedditSlice';

export default configureStore({
    reducer: combineReducers({
      reddit: mainRedditReducer,
      subreddits: subRedditReducer,
    }),
  });
  
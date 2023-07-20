import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../api/reddit';

const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    chosenSubreddit: '/r/RandomThoughts/',
  };

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
      startGetPosts(state) {
        state.isLoading = true;
        state.error = false;
      },
      getPostsSuccess(state, action) {
        state.isLoading = false;
        state.posts = action.payload;
      },
      getPostsFailed(state) {
        state.isLoading = false;
        state.error = true;
      },
      setPosts(state, action) {
        state.posts = action.payload;
      },
      setChosenSubreddit(state, action) {
        state.chosenSubreddit = action.payload;
        state.searchTerm = '';
      },
      setSearchTerm(state, action) {
        state.searchTerm = action.payload;
      },
      toggleShowingComments(state, action) {
        state.posts[action.payload].showingComments = !state.posts[action.payload]
          .showingComments;
      },
      startGetComments(state, action) {
        state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        if (!state.posts[action.payload].showingComments) {
          return;
        }
        state.posts[action.payload].loadingComments = true;
        state.posts[action.payload].error = false;
      },
      getCommentsSuccess(state, action) {
        state.posts[action.payload.index].loadingComments = false;
        state.posts[action.payload.index].comments = action.payload.comments;
      },
      getCommentsFailed(state, action) {
        state.posts[action.payload].loadingComments = false;
        state.posts[action.payload].error = true;
      },
    },
});

export const {
  setPosts,
  getPostsFailed,
  getPostsSuccess,
  startGetPosts,
  setSearchTerm,
  setChosenSubreddit,
  toggleShowingComments,
  getCommentsFailed,
  getCommentsSuccess,
  startGetComments,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSubredditPosts(subreddit);

    const postsWithData = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithData));
  } catch (error) {
    dispatch(getPostsFailed());
  }
};

export const fetchComments = (index, link) => async (dispatch) => {
  try {
    dispatch(startGetComments(index));
    const comments = await getPostComments(link);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailed(index));
  }
};

const selectPosts = (state) => state.reddit.posts;

const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectChosenSubreddit = (state) => 
  state.reddit.chosenSubreddit;


export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }
);

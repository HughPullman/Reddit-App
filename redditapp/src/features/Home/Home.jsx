import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import Post from '../Posts/Post';
import PostLoading from '../Posts/PostLoading';
import getRandomNumber from '../../functions/getRandomNumber';
import {
  fetchPosts,
  selectFilteredPosts,
  setSearchTerm,
  fetchComments,
} from '../../store/mainRedditSlice';


const Home = () => {
    const reddit = useSelector((state) => state.reddit);
    const { isLoading, error, searchTerm, chosenSubreddit } = reddit;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPosts(chosenSubreddit));
    }, [chosenSubreddit, dispatch]);

    const onChangeComments = (index) => {
        const getComments = (permalink) =>{
            dispatch(fetchComments(index, permalink));
        };

        return getComments;
    };

    if (isLoading) {
        return(
            <div>
              {Array(getRandomNumber(3,10)).fill(<PostLoading />)}
            </div>
                

            
        );
    }

    if (error) {
        return (
          <div className="error">
            <h2>Error failed to load.</h2>
            <button
              type="button"
              onClick={() => dispatch(fetchPosts(chosenSubreddit))}
            >
              Reload
            </button>
          </div>
        );
    }
    
    if (posts.length === 0) {
        return (
          <div className="error">
            <h2>No posts matching "{searchTerm}"</h2>
            <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
              Home
            </button>
          </div>
        );
    }
    
    return (
        <>
          {posts.map((post, index) => (
            <Post
              key={post.id}
              post={post}
              onChangeComments={onChangeComments(index)}
            />
          ))}
        </>
    );

    
};

export default Home;
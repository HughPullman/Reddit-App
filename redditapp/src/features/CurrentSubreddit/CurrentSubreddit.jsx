import { useSelector } from 'react-redux';
import React from 'react';
import { selectChosenSubreddit } from '../../store/mainRedditSlice';


const CurrentSubReddit = () => {

    const chosenSubreddit = useSelector(selectChosenSubreddit);

    return(
        <>
            {chosenSubreddit}
        </>
    );

};
export default CurrentSubReddit; 
import React, { useState, useEffect } from 'react';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaRedditSquare, FaSearch } from 'react-icons/fa';
import { setSearchTerm } from '../../store/mainRedditSlice';
import CurrentSubReddit from '../CurrentSubreddit/CurrentSubreddit';

const Header = () => {

    const [searchTermLocal, setSearchTermLocal] = useState('');
    const searchTerm = useSelector((state) => state.reddit.searchTerm);
    const dispatch = useDispatch();

    const onSearchTermChange = (e) => {
        setSearchTermLocal(e.target.value);
    };

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const onSearchTermSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
    }
    return(
        <header>
            <div className='logo'>
                <FaRedditSquare className="logo-icon"/>
                <p>
                    Reddit<span>Daily</span>
                </p>
            </div>
            <form className='searchBar' onSubmit={onSearchTermSubmit}>
                <input
                type='text'
                placeholder='Search'
                value={searchTermLocal}
                onChange={onSearchTermChange}
                />
                <button type="submit" onClick={onSearchTermSubmit}>
                    <FaSearch/>
                </button>
            </form>
            <div className='currentSubReddit'>
                <CurrentSubReddit/>
            </div>
        </header>
    );
};

export default Header;
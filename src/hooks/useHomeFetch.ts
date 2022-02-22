import { useState, useEffect } from "react";

// API
import API, { Movie, Movies } from '../API';

// Helpers
import { isPersistedState } from "../helpers";

const initalState: Movies = {
    page: 0,
    results: [] as Movie[],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    

    const fetchMovies = async (page: number, searchTerm = '') => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);

            setState(previous => ({
                ...movies, 
                results: page > 1 ? [...previous.results, ...movies.results] : [...movies.results]
            }));
        } catch(error) {
            setError(true);
        }
        setLoading(false);
    };

    // initial and search
    useEffect(() => {
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');

            if (sessionState) {
                console.log("from SessionStorage");
                setState(sessionState);
                return;
            }
        }
        console.log("from API");
        setState(initalState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    // load more
    useEffect(() => {
        if (!isLoadingMore)
            return;

        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page]);

    // Write to session storage
    useEffect(() => {
        if(!searchTerm)
            sessionStorage.setItem('homeState', JSON.stringify(state))

    }, [searchTerm, state]);

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};

};
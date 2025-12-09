import React, {useEffect, useState} from 'react'
import Search from "./Components/Search.jsx";
import {Card} from "./Components/Card.jsx";
import {useDebounce} from "react-use";
import {getTrendingovies, updateSearchCount} from "./appwrite.js";


const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

export const App = () => {
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [TrendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebouncedSearch(searchText), 400, [searchText]);

    const fetchData = async (query = '') => {
        setLoading(true);
        try {
            console.log('fetching start')
            const endpoint = query ?
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS)

            console.log(endpoint)

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            if (data.response == 'False')
                setError(data.Error || 'Failed to fetch movie');

            setMovieList(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
            console.log(data)

        } catch (e) {
            console.error(e)
            setError(e.message)
            console.log(`ERROR: ${error}}`)
        } finally {
            setLoading(false);
        }
    }

    const fetchTrendingMovies = async () => {
        try {
            const result = await getTrendingovies();
            setTrendingMovies(result);
        } catch (e) {
            console.error('Error while loading movies' + e)
        }

    }

    useEffect(() => {
        fetchData(debouncedSearch);
    }, [debouncedSearch]);

    useEffect(() => {
        fetchTrendingMovies();
    }, [])

    return (
        <main className="flex w-4/5 mx-auto items-center justify-center bg-gray-800">
            <div className="pattern"/>
            <div className="wrapper">
                <header className="mt-3 flex justify-center bg-gray-800 flex-col gap-5">
                    <img src="/main-bg.jpg" className="rounded-2xl w-3/5 h-96 mx-auto object-cover" alt=""/>
                    <h1 className="text-3xl font-bold mx-auto">
                        Find <span
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">Movies</span> You'll
                        Like
                    </h1>
                    <Search searchText={searchText} setSearchText={setSearchText}/>
                </header>
                {TrendingMovies.length && (
                    <section>
                        <h2>Trending Movies</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
                            {TrendingMovies.map((movie, index) => (
                                <li key={movie.$id} className="flex items-center gap-3">

                                    {/* Number block as large as poster */}
                                    <div className="h-72 w-20 flex items-center justify-center bg-black text-white rounded-xl">
        <span className="text-6xl font-extrabold tracking-wider">
          {index + 1}
        </span>
                                    </div>

                                    {/* Poster */}
                                    <img
                                        className="h-72 w-full object-cover rounded-xl"
                                        src={movie.posterURL
                                            ? `https://image.tmdb.org/t/p/w500/${movie.posterURL}`
                                            : '/no-movie.png'
                                        }
                                        alt=""
                                    />

                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <section>
                    <h2>All Movies</h2>
                    {loading ? (
                        <p className="text-white">Loading..........</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
                            {movieList.map((movie) => (
                                <Card key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}

                    {error && <Error>{error}</Error>}
                </section>
            </div>
        </main>
    )
}

export default App
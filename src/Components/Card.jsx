import React from 'react'
import Search from "./Search.jsx";

export const Card = ({movie}) => {
    return (
        <div className="flex flex-col w-[200px] gap-2 p-3 mb-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <img
                className="w-full h-72 object-cover rounded-xl"
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}
                alt=""
            />

            <h2 className="text-xl font-semibold text-purple-600 text-wrap">
                {movie.title}
            </h2>

            <div className="flex items-center gap-2">
                <img src="/star.png" className="w-5 h-5" />
                <p className="text-gray-700 text-sm">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </p>
            </div>
        </div>
    )
}

export default Search

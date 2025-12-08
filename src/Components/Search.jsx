import React from 'react'

const Search = ({searchText, setSearchText}) => {
    return (
        <>
            <div className="flex items-center gap-3 border rounded-xl bg-white shadow-sm w-4/6  mx-auto">
                <img src="/search.jpg" alt="" className="w-10 h-10 object-contain" />
                <input
                    className="flex-1 h-10 outline-none"
                    type="text"
                    value={searchText}
                    placeholder="Search..."
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="text-gray-800 text-3xl">{searchText}</div>
        </>
    )
}
export default Search

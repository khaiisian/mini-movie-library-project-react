import React, {useState} from 'react'
import Search from "./Components/Search.jsx";

export const App = () => {
    const [searchText, setSearchText] = useState("");

    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                <header>
                    <img src="/main-bg.jpg" />
                    <h1 className="text-3xl font-bold">
                        Find <span
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">Movies</span> You'll
                        Like
                    </h1>
                </header>
                <Search searchText={searchText} setSearchText={setSearchText} />
            </div>


        </main>
    )
}

export default App
import React from "react";
import styles from "./Search.module.css"

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div>
      <div>
        <img src="./search.svg" alt="" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;

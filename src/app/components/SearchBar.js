// src/components/SearchBar.js

import React, { useState } from "react";
import styles from "../styles/components/SearchBar.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokemon..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;

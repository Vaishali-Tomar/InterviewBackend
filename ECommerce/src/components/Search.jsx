import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Products from './Products';

const Search = () => {
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const filteredData = items.filter((p) =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilterData(filteredData);
  }, [term]);

  return (
    <div>
      {filterData.length > 0 ? (
        <Products items={filterData} />
      ) : (
        <p>No products found for "{term}"</p>
      )}
    </div>
  );
};

export default Search;

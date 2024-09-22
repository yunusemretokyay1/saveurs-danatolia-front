import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SearchResultsPage = () => {
    const router = useRouter();
    const { query } = router.query;
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                const response = await axios.get(`/api/product/search`, {
                    params: { query },
                });
                setSearchResults(response.data);
            };
            fetchResults();
        }
    }, [query]);

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((product) => (
                        <li key={product._id}>
                            <a href={`/product/${product._id}`}>{product.title}</a>
                            <p>{product.price} USD</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found for "{query}"</p>
            )}
        </div>
    );
};

export default SearchResultsPage;

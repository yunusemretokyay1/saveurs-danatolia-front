import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchIcon from "@/components/icons/SearchIcon";
import { useRouter } from 'next/router';

const SearchContainer = styled.div`
    position: relative;
    width: 200px; /* Container genişliği */
`;

const Input = styled.input`
    padding: 6px 40px 8px 8px; 
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%; 
    box-sizing: border-box; 
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 35%;
    right: 10px; 
    transform: translateY(-50%); 
    pointer-events: none; 
`;

const Suggestions = styled.ul`
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    z-index: 1;
`;

const SuggestionItem = styled.li`
    display: flex;
    align-items: center; 
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const SuggestionImage = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 4px; 
`;

const SearchBar = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 0) {
            try {
                const response = await axios.get(`/api/search?query=${value}`);
                console.log("API Response:", response.data);
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        console.log("Selected suggestion:", suggestion);
        if (suggestion && suggestion._id) {
            setQuery(suggestion.title);
            setSuggestions([]);
            router.push(`/product/${suggestion._id}`);
        } else {
            console.error("Suggestion does not have an _id");
        }
    };

    return (
        <SearchContainer>
            <Input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <IconWrapper>
                <SearchIcon />
            </IconWrapper>
            {suggestions.length > 0 && (
                <Suggestions>
                    {suggestions.map((suggestion) => (
                        <SuggestionItem
                            key={suggestion._id}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <SuggestionImage
                                src={suggestion.images[0] || "/placeholder-image.png"}
                                alt={suggestion.title}
                            />
                            {suggestion.title}
                        </SuggestionItem>
                    ))}
                </Suggestions>
            )}
        </SearchContainer>
    );
};

export default SearchBar;

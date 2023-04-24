import React, {useEffect, useState} from 'react';
import {DATASET} from "./data";
import {useNavigate, useLocation } from "react-router-dom";
import styled from '@emotion/styled'

const Input = styled.input`
  border: none;
  appearance: none;
  background: #f2f2f2;
  border-radius: 3px;
  width: 250px;
  height: 50px;
  outline: none;
  font-size: 20px;
  padding: 5px;
`

const UsersContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0;
`

const User = styled.li`
  list-style: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`

const SearchComponent = () => {
    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [areResults, setAreResults] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    useEffect(() => {
        const paramValue = params.get("value");
        if (!searchValue && paramValue) {
            setSearchValue(paramValue);
        }
    }, [params, searchValue]);

    useEffect(() => {
        navigate(`?value=${searchValue}`);
    }, [searchValue, navigate]);

    useEffect(() => {
        if (!searchValue) {
            setFilteredData(DATASET);
            setAreResults(true);
            return;
        }

        const filteredNames = DATASET.filter((name) =>
            name.toLowerCase().includes(searchValue.toLowerCase())
        );
        const hasResults = !!filteredNames.length;

        setFilteredData(filteredNames);
        setAreResults(hasResults);
    }, [searchValue]);

    return (
        <div>
            <Input
                placeholder={"Search user..."}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
            />
            <h3>{areResults ? "Result:" : "No Results"}</h3>
            <UsersContainer>
                {filteredData.map((el, index) => (
                    <User key={index}>{el}</User>
                ))}
            </UsersContainer>
        </div>
    );
};

export default SearchComponent;

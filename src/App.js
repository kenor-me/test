import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

import { useDebounce } from './components/hooks';
import { Search } from './components/Search';
import { Dropdown } from './components/Dropdown';
import { SearchList } from './components/SearchList';

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    fetch('https://swapi.dev/api/starships')
      .then((response) => response.json())
      .then((data) => {
        setDataList(data.results);
      });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  const handleSearchCards = (value) =>
    dataList?.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

  const downHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setKeyPressed(true);
    }
  };

  const handleClick = () => {
    if (debouncedSearchTerm) {
      const searchResult = handleSearchCards(searchValue);
      setSearchList(searchResult);
      setIsVisibleDropdown(false);
    } else {
      setSearchList([]);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setKeyPressed(false);
      const searchResult = handleSearchCards(searchValue);
      if (!isEmpty(searchResult)) {
        setDropDownList(searchResult);
        setIsVisibleDropdown(true);
      } else setIsVisibleDropdown(false);
    } else {
      setSearchList([]);
      setIsVisibleDropdown(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (keyPressed && searchValue) {
      const searchResult = handleSearchCards(searchValue);
      setSearchList(searchResult);
      setIsVisibleDropdown(false);
    }
  }, [keyPressed]);

  const onDropDownClick = (name) => {
    setIsVisibleDropdown(false);
    const searchResult = handleSearchCards(name);
    setSearchList(searchResult);
  };

  return (
    <div className='main-container'>
      <Search handleSearchValue={handleSearchValue} handleClick={handleClick} />
      <Dropdown
        searchList={dropDownList}
        isVisibleDropdown={isVisibleDropdown}
        onDropDownClick={onDropDownClick}
      />
      <SearchList dataList={searchList} />
    </div>
  );
};

export default App;

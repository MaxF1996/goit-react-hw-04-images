import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormInput,
  SearchFormBtn,
  SearchFormBtnLabel,
} from './Searchbar.styled';

const Searchbar = props => {
  const [searchFromUser, setSearchFromUser] = useState('');

  const handleChange = event => {
    setSearchFromUser(() => event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!searchFromUser.trim()) {
      return alert('Nothing to search');
    }
    props.onSubmit(searchFromUser);
    setSearchFromUser(() => '');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchFormBtnLabel>
            <FiSearch size={25} stroke="#3f51b5" />
          </SearchFormBtnLabel>
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchFromUser}
          name="searchFromUser"
        ></SearchFormInput>
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;

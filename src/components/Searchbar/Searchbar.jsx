import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormInput,
  SearchFormBtn,
  SearchFormBtnLabel,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchFromUser: '',
  };

  handleChange = event => {
    this.setState({ searchFromUser: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.searchFromUser.trim()) {
      return alert('Nothing to search');
    }
    this.props.onSubmit(this.state.searchFromUser);
    this.setState({ searchFromUser: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
            value={this.state.searchFromUser}
            name="searchFromUser"
          ></SearchFormInput>
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

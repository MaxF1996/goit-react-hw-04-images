import { Component } from 'react';
import AppBlock from './App.styled';

import responseImages from './service/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { animateScroll } from 'react-scroll';

export default class App extends Component {
  state = {
    searchFromUser: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    id: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchFromUser, page } = this.state;
    if (
      prevState.searchFromUser !== searchFromUser ||
      prevState.page !== page
    ) {
      this.responseImages(searchFromUser, page);
    }
  }

  responseImages = async (query, page) => {
    this.setState({ isLoading: true });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await responseImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  FormSubmit = searchFromUser => {
    this.setState({ searchFromUser, images: [], page: 1, loadMore: false });
  };

  onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollOnMoreBtn();
  };

  scrollOnMoreBtn = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  openModal = largeImageURL => {
    console.log(largeImageURL);
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, isLoading, loadMore, page, showModal, largeImageURL } =
      this.state;
    return (
      <AppBlock>
        <Searchbar onSubmit={this.FormSubmit}></Searchbar>
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </AppBlock>
    );
  }
}

import { useState, useEffect } from 'react';
import AppBlock from './App.styled';

import fetchImages from './service/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import toast, { Toaster } from 'react-hot-toast';
import { animateScroll } from 'react-scroll';

const App = () => {
  const [searchFromUser, setSearchFromUser] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  // const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  // const [id, setId] = useState(null);

  useEffect(() => {
    const responseImages = async (query, page) => {
      if (!query) {
        return;
      }
      setIsLoading(() => true);
      try {
        const { hits, totalHits } = await fetchImages(query, page);
        if (hits.length === 0) {
          toast.error('We did not found anything...');
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        setLoadMore(() => page < Math.ceil(totalHits / per_page));
      } catch (fetchError) {
        // setError(() => fetchError.message);
        toast.error('Oops, something went wrong.');
      } finally {
        setIsLoading(() => false);
      }
    };
    responseImages(searchFromUser, page);
  }, [searchFromUser, page, per_page]);

  const FormSubmit = searchFromUser => {
    setSearchFromUser(() => searchFromUser);
    setImages(() => []);
    setPage(() => 1);
    setLoadMore(() => false);
  };

  const onloadMore = () => {
    setPage(prevState => prevState + 1);
    scrollOnMoreBtn();
  };

  const scrollOnMoreBtn = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const openModal = largeImageURL => {
    setShowModal(() => true);
    setLargeImageURL(() => largeImageURL);
  };

  const closeModal = () => {
    setShowModal(() => false);
  };

  return (
    <AppBlock>
      <Searchbar onSubmit={FormSubmit}></Searchbar>
      <Toaster
        position="top-right"
        containerClassName="notification"
        toastOptions={{
          duration: 1250,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {loadMore && <Button onloadMore={onloadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </AppBlock>
  );
};

export default App;

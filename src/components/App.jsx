import { useState, useEffect } from 'react';
import { Box } from 'components/Box';
import { GlobalStyle } from './GlobalStyle';
import { getImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchValue, setSearchValue] = useState(() => '');
  const [imagesList, setImagesList] = useState(() => []);
  const [page, setPage] = useState(() => 1);
  const [error, setError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => false);
  const [isModalOpen, setIsModalOpen] = useState(() => false);
  const [modalImage, setModalImage] = useState(() => '');

  useEffect(() => {
    try {
      if (!searchValue) {
        return;
      }

      if (page === 1) {
        (async () => {
          setImagesList(await getImages(searchValue));
          setIsLoading(false);
        })();
      }

      if (page > 1) {
        (async () => {
          const extendedImagesList = await getImages(searchValue, page);

          setImagesList(prev => [...prev, ...extendedImagesList]);
          setIsLoading(false);
        })();
      }
    } catch (error) {
      setError(error);
    }
  }, [searchValue, page]);

  const onSubmit = searchValue => {
    setIsLoading(true);
    setSearchValue(searchValue);
    setPage(1);
  };

  const loadMoreImages = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imgId => {
    setIsModalOpen(true);
    setModalImage(imagesList.find(image => image.id === imgId).largeImageURL);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GlobalStyle />
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={onSubmit} />
        {isLoading && <Loader />}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {!!imagesList.length && (
          <>
            <ImageGallery
              imagesList={imagesList}
              searchValue={searchValue}
              openModal={openModal}
            />
            <Box display="flex" justifyContent="center">
              <Button loadMoreImages={loadMoreImages} />
            </Box>
          </>
        )}
      </Box>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <img src={modalImage} alt={searchValue} />
        </Modal>
      )}
    </>
  );
};

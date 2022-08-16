import { Box } from 'components/Box';
import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { getImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    imagesList: [],
    nextPage: 2,
    error: null,
    isLoading: false,
    isModalOpen: false,
    modalImage: '',
  };

  onSubmit = async searchValue => {
    this.setState({ isLoading: true });

    try {
      this.setState({
        searchValue,
        imagesList: await getImages(searchValue),
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = async () => {
    this.setState({ isLoading: true });

    try {
      const { nextPage, searchValue } = this.state;
      const extendedImagesList = await getImages(searchValue, nextPage);

      this.setState(prevState => {
        return {
          nextPage: prevState.nextPage + 1,
          imagesList: [...prevState.imagesList, ...extendedImagesList],
        };
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = imgId => {
    this.setState({
      isModalOpen: true,
      modalImage: this.state.imagesList.find(image => image.id === imgId)
        .largeImageURL,
    });
  };

  closeModal = evt => {
    if (evt.currentTarget === evt.target || evt.code === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const {
      imagesList,
      searchValue,
      error,
      isLoading,
      isModalOpen,
      modalImage,
    } = this.state;

    return (
      <>
        <GlobalStyle />
        <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
          <Searchbar onSubmit={this.onSubmit} />
          {isLoading && <Loader />}
          <ImageGallery
            imagesList={imagesList}
            searchValue={searchValue}
            openModal={this.openModal}
          />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {!!imagesList.length && (
            <Box display="flex" justifyContent="center">
              <Button loadMoreImages={this.loadMoreImages} />
            </Box>
          )}
        </Box>
        {isModalOpen && (
          <Modal
            modalImage={modalImage}
            searchValue={searchValue}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

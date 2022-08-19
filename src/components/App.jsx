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
    page: 1,
    error: null,
    isLoading: false,
    isModalOpen: false,
    modalImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      const { searchValue, page } = this.state;

      if (prevState.searchValue !== searchValue) {
        this.setState({
          imagesList: await getImages(searchValue),
        });
        this.setState({ isLoading: false });
      }

      if (prevState.page !== page) {
        const extendedImagesList = await getImages(searchValue, page);

        this.setState(prevState => {
          return {
            imagesList: [...prevState.imagesList, ...extendedImagesList],
          };
        });
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  onSubmit = searchValue => {
    this.setState({ isLoading: true, searchValue });
  };

  loadMoreImages = () => {
    this.setState(prevState => {
      return {
        isLoading: true,
        page: prevState.page + 1,
      };
    });
  };

  openModal = imgId => {
    this.setState({
      isModalOpen: true,
      modalImage: this.state.imagesList.find(image => image.id === imgId)
        .largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
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
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {!!imagesList.length && (
            <>
              <ImageGallery
                imagesList={imagesList}
                searchValue={searchValue}
                openModal={this.openModal}
              />
              <Box display="flex" justifyContent="center">
                <Button loadMoreImages={this.loadMoreImages} />
              </Box>
            </>
          )}
        </Box>
        {isModalOpen && (
          <Modal closeModal={this.closeModal}>
            <img src={modalImage} alt={searchValue} />
          </Modal>
        )}
      </>
    );
  }
}

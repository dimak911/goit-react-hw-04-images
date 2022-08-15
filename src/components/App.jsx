import { Box } from 'components/Box';
import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { getImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchValue: '',
    imagesList: [],
    nextPage: 2,
    error: null,
  };

  onSubmit = async searchValue => {
    this.setState({
      searchValue,
      imagesList: await getImages(searchValue),
    });
  };

  loadMoreImages = async () => {
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
    }
  };

  render() {
    const { imagesList, searchValue, error } = this.state;

    return (
      <>
        <GlobalStyle />
        <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery imagesList={imagesList} searchValue={searchValue} />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {imagesList.length && (
            <Box display="flex" justifyContent="center">
              <Button loadMoreImages={this.loadMoreImages} />
            </Box>
          )}
        </Box>
      </>
    );
  }
}

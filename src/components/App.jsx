import { Box } from 'components/Box';
import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { getImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchValue: '',
    imagesList: [],
  };

  onSubmit = async searchValue => {
    this.setState({
      searchValue,
      imagesList: await getImages(searchValue),
    });
  };

  render() {
    const { imagesList, searchValue } = this.state;

    return (
      <>
        <GlobalStyle />
        <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery imagesList={imagesList} searchValue={searchValue} />
        </Box>
      </>
    );
  }
}

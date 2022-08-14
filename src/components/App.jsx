import { Box } from 'components/Box';
import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { getImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchValue: '',
    currentImages: null,
  };

  onSubmit = async searchValue => {
    this.setState({
      searchValue,
      currentImages: await getImages(searchValue),
    });
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
          <Searchbar onSubmit={this.onSubmit} />
        </Box>
      </>
    );
  }
}

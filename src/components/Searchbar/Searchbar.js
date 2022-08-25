import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => (
  <SearchBar>
    <Formik
      initialValues={{ search: '' }}
      onSubmit={async values => await onSubmit(values.search)}
    >
      {({ isSubmitting }) => (
        <SearchForm>
          <SearchFormButton type="submit" disabled={isSubmitting}>
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </SearchForm>
      )}
    </Formik>
  </SearchBar>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

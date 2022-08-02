import { PLACEHOLDER, SEARCH_BUTTON } from './constants';

const Search = ({ handleSearchValue, handleClick }) => {
  const handleChange = (e) => {
    handleSearchValue(e.target.value);
  };

  return (
    <div className='input-group w-50 mx-auto'>
      <span className='input-group-text' id='basic-addon1'>
        <i className='bi bi-search'></i>
      </span>
      <input
        type='text'
        className='form-control'
        placeholder={PLACEHOLDER}
        aria-label='Username'
        aria-describedby='basic-addon1'
        onChange={handleChange}
      />
      <button type='button' className='btn btn-dark' onClick={handleClick}>
        {SEARCH_BUTTON}
      </button>
    </div>
  );
};

export default Search;

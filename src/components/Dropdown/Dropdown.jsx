import { memo } from 'react';

import photo from '../../assets/stardestrrevsl1.jpg';

import './Dropdown.css';

const Dropdown = memo(({ searchList, isVisibleDropdown, onDropDownClick }) => (
  <div className='dropdown-container'>
    {isVisibleDropdown && (
      <ul className='dropdown-menu w-50'>
        {searchList.map(({ name }) => (
          <li key={name}>
            <button
              className='dropdown-item'
              onClick={() => onDropDownClick(name)}
            >
              <img src={photo} className='card-img' alt='name' />
              {name}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
));

export default Dropdown;

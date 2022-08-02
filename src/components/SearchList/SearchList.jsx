import { memo } from 'react';

import { CREW } from './constants';
import photo from '../../assets/stardestrrevsl1.jpg';
import logo from '../../assets/Emblem_of_the_First_Galactic_Empire.svg';

import './SearchList.css';

const SearchList = memo(({ dataList }) => (
  <div className='search-list'>
    {dataList.map(({ name, crew, manufacturer }, index) => (
      <div className='card mb-3' key={name + index}>
        <div className='row'>
          <div className='col-md-1'>
            <img src={photo} className='card-img' alt='name' />
          </div>
          <div className='col-md-10'>
            <div className='card-body'>
              <h5 className='card-title'>{name}</h5>
              <p className='card-text'>
                <small className='text-muted'>
                  {manufacturer} | {CREW}
                  {crew}
                </small>
              </p>
            </div>
          </div>
          <div className='col-md-1 card__logo'>
            <img src={logo} alt='logo' />
          </div>
        </div>
      </div>
    ))}
  </div>
));

export default SearchList;

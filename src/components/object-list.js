import React, { useContext } from 'react';
import { ShapeContext } from './context';
import './object-list.css';

export default function ObjectList() {
  return (
    <>

      <div className='ObjectList-top'>
        <label className='object-list-title'>Object List</label>
        <div className='object-list-items'>
          <label>OBJ1</label>
        </div>
      </div>
    </>
  );

}

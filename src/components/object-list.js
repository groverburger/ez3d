import React, { useContext } from 'react';
import { ShapeContext } from './context';
import './object-list.css';

import { objLen } from './nav-add';

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default function ObjectList() {
  // create an object list, set default name 
  const numbers  = [];
  for(let i = 0; i < objLen.cube; i ++){
    numbers.push("Cube" + i.toString()) ;
  }

  for(let i = 0; i < objLen.cylinders; i ++){
    numbers.push("Cylinder" + i.toString()) ;
  }

  for(let i = 0; i < objLen.sphere; i ++){
    numbers.push("Sphere" + i.toString()) ;
  }

  return (
    <>

      <div className='ObjectList-top'>
        <label className='object-list-title'>Object List</label>
        <div className='object-list-items'>
          <NumberList numbers={numbers} />,
        </div>
      </div>
    </>
  );

}

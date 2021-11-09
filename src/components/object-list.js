import React from 'react';
import { ShapeContext } from './context';

import '../styles/object-list.css';

/* ObjectList populates the top pane of the outliner with a list of Meshes in the scene. The saved state value is
 * an object of arrays that holds all the positions for any generated shape. Each array corresponds to their
 * respective shape. For more information, look at shapes and setShapes in App.js and ShapeContext in context.js.
 */
export default function ObjectList(props) {
  let index = 0;

  return (
    <>
      <div className='object-list-top'>
        <label className='object-list-title'>Object List</label>
        {props.owner.state.models.map((model) => {
          index += 1;
          return (
            <div key={index} className='object-list-items'>
              <label> {`Model: ${index}`} </label>
            </div>
          );
        })}
      </div>
    </>
  );
}

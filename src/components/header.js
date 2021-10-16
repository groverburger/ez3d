import React, { useContext } from 'react'
import Toggle from './toggle'
import { Context } from './context'

/**
 * Create a Header. The Header will use the global state value
 * and update it depending on if the button is pressed.
 * 
 * Toggle         When checked (clicked), change the appearance of
 *                the button. Update the global state value every
 *                time the button is clicked. The global state 
 *                value will be used in the App component to toggle
 *                the grid on or off.
 * - toggle       Holds the boolean states (true/false)
 * - setToggle    A function that changes the boolean value of toggle.
 *                This function takes the current checkbox state as a
 *                parameter and updates the toggle variable to relevant
 *                state (true/false).
 */
export default function Header() {
  const [toggle, setToggle] = useContext(Context)
  return (
    <header>
      <div className='header-inner'>
        <nav>
          <ul>
            <li className='logo'>
              <a href='/'>EZ-3D</a>
            </li>
            <li>
              <a href='/'>File</a>
            </li>
            <li>
              <a href='/'>Edit</a>
            </li>
            <li>
              <a href='/'>View</a>
            </li>
          </ul>
        </nav>
        <Toggle onChange={(event) => setToggle(event.target.checked)}/>
      </div>
    </header>
  )
}

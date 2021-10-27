import { createContext } from 'react';

/**
 * This component initializes and stores states for global use.
 * Context holds the state for grid toggle (on/off). ShapeContext
 * holds the object state for the generated shapes so that they
 * remain on the canvas and we are able to add (and keep track)
 * the generated shapes.
 *
 * Reference: https://stackoverflow.com/questions/66727049/exporting-a-state-from-hook-function-to-another-component
 *            https://tyrannosaurustech.com/blog/global-state-management-with-react-hooks-and-context/
 *            https://stackoverflow.com/questions/58451029/usestate-object-set
 *            https://stackoverflow.com/questions/60305746/how-do-i-update-an-object-state-in-react-via-hooks
 */
export const GridContext = createContext(false);
export const ShapeContext = createContext({});
export const TransformContext = createContext('');

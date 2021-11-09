import React from 'react';
import { ReactComponent as TranslateIcon } from '../icons/translate.svg';
import { ReactComponent as RotateIcon } from '../icons/rotate.svg';
import { ReactComponent as ScaleIcon } from '../icons/scale.svg';
import { ButtonGroup, Button } from 'react-bootstrap';

import '../styles/toolbar.css';

const icons = {
  translate: <TranslateIcon />,
  scale: <ScaleIcon />,
  rotate: <RotateIcon />,
};

const select = ['translate', 'scale', 'rotate'];

// When the button is clicked, set selection mode to the type that the button represents
export default class Toolbar extends React.Component {
  render() {
    const owner = this.props.owner;

    return (
      <div className='toolbar'>
        <ButtonGroup vertical>
          {select.map((type) => (
            <Button
              className='btn-light toolbar-items'
              key={type}
              active={owner.state.selectionMode === type}
              onClick={() => {
                owner.setState({ selectionMode: type });
              }}
            >
              {icons[type]}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

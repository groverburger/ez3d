import React, { useContext } from 'react';
import { ReactComponent as TranslateIcon } from '../icons/translate.svg';
import { ReactComponent as RotateIcon } from '../icons/rotate.svg';
import { ReactComponent as ScaleIcon } from '../icons/scale.svg';
import { ButtonGroup, Button } from 'react-bootstrap';
import { TransformContext } from './context';

import './toolbar.css';

const icons = {
  "translate": <TranslateIcon />,
  "scale": <ScaleIcon />,
  "rotate": <RotateIcon />,
}

const select = [
  "translate",
  "scale",
  "rotate",
]

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const owner = this.props.owner

    return (
      <div className='toolbar'>
        <ButtonGroup vertical>
          {select.map(type => (
            <Button className='btn-light toolbar-items' key={type} active={owner.state.selectionMode == type} onClick={() => {owner.setState({selectionMode: type})}}>
              {icons[type]}
            </Button>)
          )}
        </ButtonGroup>
      </div>
    )
  }
}

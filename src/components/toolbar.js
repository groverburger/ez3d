import React from 'react';
import { ReactComponent as TranslateIcon } from '../icons/translate.svg';
import { ReactComponent as RotateIcon } from '../icons/rotate.svg';
import { ReactComponent as ScaleIcon } from '../icons/scale.svg';
import { ButtonGroup, Button } from 'react-bootstrap';

import './toolbar.css';

const icons = {
  'translate': <TranslateIcon/>,
  'scale': <ScaleIcon/>,
  'rotate': <RotateIcon/>,
}

const select = ['translate', 'scale', 'rotate']

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
  }

  click() {
  }

  render() {
    return (
      <div className='toolbar'>
        <ButtonGroup vertical>
          {select.map(type => (
            <Button className='btn-light toolbar-items' key={type} active={false} onClick={this.click}>
              {icons[type]}
            </Button>)
          )}
        </ButtonGroup>
      </div>
    )
  }
}

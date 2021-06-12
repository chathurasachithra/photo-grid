import React from 'react';
import { Segment, Radio } from 'semantic-ui-react';
import './CustomSegment.scss';

export class CustomSegment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title,
      rightHeader,
      extraMargin,
      style,
      toggle,
      headerStyle,
      rightButton,
    } = this.props;
    return (
      <Segment.Group
        raised
        style={{ marginTop: extraMargin ? '40px' : null, ...style }}
        className={`${title.replace(' ', '_')} segment-container`}
      >
        <Segment className="custom-segment">
          <label className="segment-heading" style={headerStyle}>
            {title}
          </label>
          {rightButton ? rightButton : null}
          {rightHeader ? rightHeader : null}
          {toggle ? <Radio toggle /> : null}
        </Segment>
        <div className="segment-children">{this.props.children}</div>
      </Segment.Group>
    );
  }
}

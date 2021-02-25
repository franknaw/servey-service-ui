import React, {Component, PropTypes} from 'react';

export default class FormHeader extends Component {
  constructor(props, context) {
    super(props, context);
  }



  render() {

    return (
        <div className="form-header">
          {surveyForm}
        </div>
    );
  }
}


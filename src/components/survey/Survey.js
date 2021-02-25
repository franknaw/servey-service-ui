'use strict'

import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormNav from './SurveyFormNav';
import Header from './SurveyHeader';

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div>

        <div>
          <SurveyFormNav/>

          <div>
            <Header />
          </div>

          <div className="main-app-nav">
            <SurveyForm/>
          </div>
        </div>

      </div>
    );
  }

}


import React, { Component } from 'react';

import AdminForm from './AdminForm';
import AdminNav from './AdminNav';
import Header from '../survey/SurveyHeader';


export default class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (

      <div>

        <div>
          <AdminNav/>

          <div>
            <h3>Admin</h3>
          </div>

          <div className="main-app-nav">
            <AdminForm/>
          </div>
        </div>

      </div>
    );
  }
}


import React, {Component, PropTypes} from 'react';
import {render} from "react-dom";
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import {navFetchData, formFetchData} from '../../api/surveyApi';
import {defaultAdminForm} from '../../constants/appConstants';


class AdminNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: {},
      navHasErrored: false,
      navIsLoading: false,
      open: true,
      disabled: false,
      activeNav: [],
      active: 0
    };

  }

  componentDidMount() {
    this.props.fetchNavData();
  }

  handleFormDisplay(formId) {
    this.props.fetchFormData(formId);
    // Sets nav disabled state
    this.setState({navItems: {[formId]: true}});
  };


  render() {
    // TODO add loading spinner

    let item = this.props.navItems, navItems = [], navHeader = [];
    Object.keys(item).map(function (key) {
      navItems.push(item[key]);
    });

    navHeader.push(defaultAdminForm.form);
    const surveyHeader = navHeader.map((item) =>
      <MenuItem className="nav-menu" key={ item.formId } onTouchTap={() => this.handleFormDisplay(item.formId)}
                disabled={ this.state.navItems[item.formId] } primaryText={item.formName}/>
    );

    const surveyList = navItems.map((item) =>
      <MenuItem className="nav-menu" key={ item.formId } onTouchTap={() => this.handleFormDisplay(item.formId)}
                disabled={ this.state.navItems[item.formId] } primaryText={item.formName}/>
    );

    return (

      <Drawer open={this.state.open}>
        <div className="nav-header">
          Available Surveys
          <hr/>
        </div>
        <div className="nav-menu">
          {surveyHeader}
          {surveyList}
        </div>
      </Drawer>

    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNavData: (url) => dispatch(navFetchData(url)),
    fetchFormData: (url) => dispatch(formFetchData(url))
  };
};

const mapStateToProps = (state) => {
  return {
    navItems: state.navItems,
    navHasErrored: state.navHasErrored,
    navIsLoading: state.navIsLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNav);

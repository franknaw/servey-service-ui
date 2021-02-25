import React, {Component, PropTypes} from 'react';
import {render} from "react-dom";
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import {navFetchData, formFetchData} from '../../api/surveyApi';

class SurveyFormNav extends Component {
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

  handleTouchTap(formId) {
    this.props.fetchFormData(formId);
    this.setState({navItems: {[formId]: true}});
  };


  render() {
    // TODO add loading spinner

    let item = this.props.navItems, navItems = [];
    Object.keys(item).map(function (key) {
      if (item[key].formName !== "Create New Survey")
        navItems.push(item[key]);

    });

    const surveyList = navItems.map((item) =>
      <MenuItem className="nav-menu" key={ item.formId } onTouchTap={() => this.handleTouchTap(item.formId)}
                disabled={ this.state.navItems[item.formId] } primaryText={item.formName}/>
    );

    return (

      <Drawer open={this.state.open}>
        <div className="nav-header">
          Available Surveys
          <hr/>
        </div>
        <div className="nav-menu">
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
)(SurveyFormNav);

import React, {Component, PropTypes} from 'react';
import {render} from "react-dom";
import {connect} from 'react-redux';
import Form from "react-jsonschema-form";
import {submitFormData} from '../../api/surveyApi';

class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formItems: {formId: {}, formName: {}, schema: [], uischema: []},
      formHasErrored: false,
      formIsLoading: false,
      submitFormItems: {},
      submitFormHasErrored: false,
      submitFormIsLoading: false,
      initialData: {}
    };
  }


  componentWillReceiveProps(nextProps) {
    // Set default form data in schema not initialData
    // if (nextProps.formItems.schema) {
    //   let props = nextProps.formItems.schema.properties, data = {};
    //   Object.keys(props).map(function (key) {
    //     if (key.lastIndexOf('question', 0) === 0) {
    //       data[key] = 3;
    //     }
    //   });
    //
    //   this.setState({initialData: data})
    // }
  }


  handleFormSubmission(formData) {
    let formItem = this.props.formItems;
    let formProps = this.props.formItems.schema.properties;
    // build a more concise formData, put slider questions in array
    let newFormData = [], questions = [];
    {
      Object.keys(formProps).map(function (key) {
        Object.keys(formData).map(function (dataKey) {
          if (key === dataKey) {
            if (key.lastIndexOf('question', 0) === 0) {
              questions.push({formItem: key, title: formProps[key].title, value: formData[key]});
            } else {
              newFormData.push({formItem: key, title: formProps[key].title, value: formData[key]});
            }
          }
        })
      })
    }

    newFormData.push({questions: questions});
    formData = {
      formId: formItem.formId,
      formName: formItem.formName,
      formData: newFormData,
    };

    this.props.submitFormData(formData)
  }

  handleFormErrors(errors) {
    console.log("Form Errors ", errors);
  }

  // TODO add loading spinner, add modal for form submission results.
  render() {

    const onSubmit = ({formData}) => this.handleFormSubmission(formData);
    const onError = ({errors}) => this.handleFormErrors(errors);
    //const log = (type) => console.log.bind(console, type);

    let formSchema, formUISchema, initialData;
    if (!this.props.formItems.schema)
      return (<div/>);

    formSchema = this.props.formItems.schema;
    formUISchema = this.props.formItems.uischema;
//    initialData = this.state.initialData;
//    formData={initialData}

    return (

      <Form schema={formSchema}
            uiSchema={formUISchema}
            onSubmit={onSubmit}
            onError={onError}/>
    );

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    submitFormData: (url) => dispatch(submitFormData(url))
  };
};

const mapStateToProps = (state) => {
  return {
    formItems: state.formItems,
    formHasErrored: state.formHasErrored,
    formIsLoading: state.formIsLoading,
    submitFormItems: state.submitFormItems,
    submitFormHasErrored: state.submitFormHasErrored,
    submitFormIsLoading: state.submitFormIsLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyForm);

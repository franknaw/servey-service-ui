import React, {Component, PropTypes} from 'react';
import {render} from "react-dom";
import {connect} from 'react-redux';
import Form from "react-jsonschema-form";
import {submitFormData} from '../../api/surveyApi';
import {adminDeleteForm, createAdminForm} from '../../api/adminApi';
import RaisedButton from 'material-ui/RaisedButton';
import {navFetchData, formFetchData} from '../../api/surveyApi';
import {defaultAdminForm} from '../../constants/appConstants';


class AdminForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formItems: {formId: {}, formName: {}, schema: {}, uischema: []},
      formHasErrored: false,
      formIsLoading: false,
      submitFormItems: {},
      submitFormHasErrored: false,
      submitFormIsLoading: false,
      initialData: {},
      deletedItem: {}
    };
  }


  // First pass: Lay this out very rudimentary
  // deconstruct Survey Form and then reconstruct to admin survey form
  componentWillReceiveProps(nextProps) {

    this.setState(nextProps);
    this.setState({initialData: {}});


    //Transform survey form to editable admin form
    if (nextProps.formItems.schema && nextProps.formItems.formId !== "defaultForm") {

      let questions = [], instructors = [], comments, organization, formName, formId, formTitle, props = nextProps.formItems.schema.properties;
      formName = nextProps.formItems.formName;
      formId = nextProps.formItems.formId;
      formTitle = nextProps.formItems.schema.title;

      Object.keys(props).map(function (key) {

        if (key.lastIndexOf('question', 0) === 0) {
          questions.push(props[key].title)
        }

        if (key.lastIndexOf('instructors', 0) === 0) {
          for (let i = 0; i < props[key].items.enum.length; i++) {
            instructors.push(props[key].items.enum[i]);
          }
        }

        if (key.lastIndexOf('comments', 0) === 0) {
          comments = props[key].title;
        }
        if (key.lastIndexOf('organization', 0) === 0) {
          organization = props[key].title;
        }

      });

      console.log('formIdformIdformIdformId ', formId);

      this.setState({formItems: defaultAdminForm.form});
      this.setState({
        initialData: {
          formId: formId,
          formName: formName,
          title: formTitle,
          comments: comments,
          organization: organization,
          questions,
          instructors
        }
      });
    }
  }


  // First pass: Lay this out very rudimentary
  // deconstruct formData and then reconstruct to survey form
  handleCreate(formData) {
    var uuid = require('react-native-uuid');

    console.log("handleData ", formData);

    let surveyForm = {}, properties = {}, instructors = [], uischema = {};

    Object.keys(formData).map(function (key) {
      //build survey question slider
      if (key === 'questions') {
        for (let i = 0; i < formData[key].length; i++) {
          properties['question' + i] = {
            "title": formData[key][i],
            "type": "integer",
            "minimum": 1,
            "maximum": 5,
            "multipleOf": 1,
            "default": 3
          };

          uischema['question' + i] = {"ui:widget": "range"}

        }

      } else if (key === 'comments') {
        properties['comments'] = {
          "type": "string",
          "title": formData.comments
        };

        uischema['comments'] = {
          "ui:widget": "textarea"
        }

      }

      else if (key === 'organization') {
        properties['organization'] = {
          "type": "string",
          "title": formData.organization
        }

      }

      // build survey instructor list
      else if (key === 'instructors') {
        for (let i = 0; i < formData[key].length; i++) {
          instructors[i] = formData[key][i];
          console.log(i + " instructors ", formData[key]);
        }

        properties['instructors'] = {
          "type": "array",
          "title": "Instructor",
          "items": {
            "type": "string",
            "enum": instructors

          },
          "uniqueItems": true
        };

        uischema['instructors'] = {
          "ui:widget": "checkboxes"
        }

      }

    });

    let formId = uuid.v1();
    if (formData.formId)
      formId = formData.formId;

    surveyForm = {
      "formName": formData.formName,
      "formId": formId,
      "schema": {
        "title": formData.title,
        "type": "object",
        properties,
      },
      uischema
    };

    console.log(" surveyForm ", surveyForm);
    this.props.createAdminForm(surveyForm)

  }

  handleFormErrors(errors) {
    console.log("Form Errors ", errors);
  }

  // not used
  handleUpdate(formId) {
    console.log("handleUpdate ", formId);
  }

  // Needs UI refresh
  handleDelete(formId) {
    console.log("handleDelete ", formId);

    this.props.adminDeleteForm(formId);
    this.setState({formItems: {schema: {}}});
    this.forceUpdate();

    console.log("handleDelete ", this.state.deletedItem);
    this.props.fetchNavData();
    //this.props.fetchFormData(formId);

  }

  // TODO add loading spinner, add modal for form submission results.
  render() {

    console.log("RENDER() ", this.state.formItems);

    const onSubmit = ({formData}) => this.handleCreate(formData);
    const onError = ({errors}) => this.handleFormErrors(errors);
    //const log = (type) => console.log.bind(console, type);

    let formSchema, formUISchema = {}, initialData;
    if (!this.props.formItems.schema || !this.state.formItems.formId)
      return (<div/>);


    formSchema = this.state.formItems.schema;
    initialData = this.state.initialData;

    const style = {
      margin: 12,
    };

    let buttonObj, createButton, updateButton, deleteButton;
    if (this.props.formItems.formId !== 'defaultForm') {
      buttonObj = [{label: 'Update'}];
      updateButton = buttonObj.map((item) => <RaisedButton type="submit" key={item.label} label={item.label}
                                                           primary={true}
                                                           style={style}
      />);

      buttonObj = [{label: 'Delete'}];
      deleteButton = buttonObj.map((item) => <RaisedButton key={item.label} label={item.label} secondary={true}
                                                           style={style}
                                                           onTouchTap={() => this.handleDelete(this.state.initialData.formId)}/>);
    } else {
      buttonObj = [{label: 'Create New'}];
      createButton = buttonObj.map((item) => <RaisedButton type="submit" key={item.label} label={item.label}
                                                           primary={true}
                                                           style={style}
      />);
    }

    return (

      <Form schema={formSchema}
            uiSchema={formUISchema}
            formData={initialData}
            onError={onError}
            onSubmit={onSubmit}>
        <div>
          {updateButton}
          {createButton}
          {deleteButton}
        </div>
      </Form>

    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    submitFormData: (url) => dispatch(submitFormData(url)),
    adminDeleteForm: (url) => dispatch(adminDeleteForm(url)),
    fetchNavData: (url) => dispatch(navFetchData(url)),
    fetchFormData: (url) => dispatch(formFetchData(url)),
    createAdminForm: (url) => dispatch(createAdminForm(url))
  };
};

const mapStateToProps = (state) => {
  return {
    deletedItem: state.deletedItem,
    formItems: state.formItems,
    formHasErrored: state.formHasErrored,
    formIsLoading: state.formIsLoading,
    submitFormItems: state.submitFormItems,
    submitFormHasErrored: state.submitFormHasErrored,
    submitFormIsLoading: state.submitFormIsLoading,

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminForm);

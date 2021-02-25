import 'whatwg-fetch';
import config from '../appConfig';
import {
  navIsLoading, navFetchDataSuccess, navHasErrored,
  formFetchDataSuccess, formHasErrored, formIsLoading,
  submitFormDataSuccess, submitFormHasErrored, submitFormIsLoading
} from '../actions/surveyActions'
import {defaultAdminForm} from '../constants/appConstants';


export function navFetchData() {
  return (dispatch) => {
    dispatch(navIsLoading(true));

    fetch(config.surveyEndpoints.surveyNavigation)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(navIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(navFetchDataSuccess(items.items)))
      .catch(() => dispatch(navHasErrored(true)));
  };
}

export function formFetchData(formId) {
  // load default admin survey form
  if (formId === 'defaultForm') {
    return (dispatch) => {
      dispatch(formFetchDataSuccess(defaultAdminForm.form));
    };
  }

  // else make call to service for survey form
  return (dispatch) => {
    dispatch(formIsLoading(true));

    fetch(config.surveyEndpoints.surveyForm + formId)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(formIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(formFetchDataSuccess(items.items)))
      .catch(() => dispatch(formHasErrored(true)));
  };
}

export function submitFormData(formData) {

  console.log('submitFormData(): ', formData);


  return (dispatch) => {
    dispatch(submitFormIsLoading(true));

    fetch(config.surveyEndpoints.surveyFormSubmit, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: 'authme',
        form: formData
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(submitFormIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(submitFormDataSuccess(items)))
      .catch(() => dispatch(submitFormHasErrored(true)));
  };
}


// https://www.npmjs.com/package/whatwg-fetch#post-form

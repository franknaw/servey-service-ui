import 'whatwg-fetch';
import config from '../appConfig';
import {adminDeleteFormSuccess, createSurveyFormSuccess} from "../actions/adminActions";

export function adminDeleteForm(formId) {
  return (dispatch) => {
    // dispatch(formIsLoading(true));

    fetch(config.surveyEndpoints.adminDeleteForm + formId, {method: 'DELETE'})
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        //  dispatch(formIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(adminDeleteFormSuccess(items.items)))
    //.catch(() => dispatch(formHasErrored(true)));
  };

}
export function createAdminForm(form) {

  // console.log('createAdminForm(): ', formData);


  return (dispatch) => {
    //dispatch(submitFormIsLoading(true));

    fetch(config.surveyEndpoints.adminCreateForm, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        form
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        //   dispatch(submitFormIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(createSurveyFormSuccess(items)))
    // .catch(() => dispatch(submitFormHasErrored(true)));
  };
}




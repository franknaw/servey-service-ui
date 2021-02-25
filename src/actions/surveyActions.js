/** Survey Navigation Actions **/
export function navHasErrored(bool) {
  return {
    type: 'NAV_HAS_ERRORED',
    navHasErrored: bool
  };
}

export function navIsLoading(bool) {
  return {
    type: 'NAV_IS_LOADING',
    navIsLoading: bool
  };
}

export function navFetchDataSuccess(navItems) {
  return {
    type: 'NAV_FETCH_DATA_SUCCESS',
    navItems
  };
}

/** Survey Form Display Actions **/
export function formHasErrored(bool) {
  return {
    type: 'FORM_HAS_ERRORED',
    formHasErrored: bool
  };
}

export function formIsLoading(bool) {
  return {
    type: 'FORM_IS_LOADING',
    formIsLoading: bool
  };
}

export function formFetchDataSuccess(formItems) {
  return {
    type: 'FORM_FETCH_DATA_SUCCESS',
    formItems
  };
}

/** Survey Form Submit Actions **/
export function submitFormHasErrored(bool) {
  return {
    type: 'SUBMIT_FORM_HAS_ERRORED',
    submitFormHasErrored: bool
  };
}

export function submitFormIsLoading(bool) {
  return {
    type: 'SUBMIT_FORM_IS_LOADING',
    submitFormIsLoading: bool
  };
}

export function submitFormDataSuccess(submitFormItems) {
  return {
    type: 'SUBMIT_FORM_FETCH_DATA_SUCCESS',
    submitFormItems
  };
}


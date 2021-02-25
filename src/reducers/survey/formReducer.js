/** Reducers for survey form actions **/
export function formHasErrored(state = false, action) {
  switch (action.type) {
    case 'FORM_HAS_ERRORED':
      return action.formHasErrored;

    default:
      return state;
  }
}

export function formIsLoading(state = false, action) {
  switch (action.type) {
    case 'FORM_IS_LOADING':
      return action.formIsLoading;

    default:
      return state;
  }
}

export function formItems(state = [], action) {
  switch (action.type) {
    case 'FORM_FETCH_DATA_SUCCESS':
      return action.formItems;

    default:
      return state;
  }
}

export function submitFormHasErrored(state = false, action) {
  switch (action.type) {
    case 'SUBMIT_FORM_HAS_ERRORED':
      return action.submitFormHasErrored;

    default:
      return state;
  }
}

export function submitFormIsLoading(state = false, action) {
  switch (action.type) {
    case 'SUBMIT_FORM_IS_LOADING':
      return action.submitFormIsLoading;

    default:
      return state;
  }
}

export function submitFormItems(state = [], action) {
  switch (action.type) {
    case 'SUBMIT_FORM_FETCH_DATA_SUCCESS':
      return action.submitFormItems;

    default:
      return state;
  }
}

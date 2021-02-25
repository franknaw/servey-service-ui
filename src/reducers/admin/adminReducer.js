
export function deleteForm(state = [], action) {
  switch (action.type) {
    case 'ADMIN_DELETE_FORM_SUCCESS':
      return action.deletedItem;

    default:
      return state;
  }
}
export function submitFormItems(state = [], action) {
  switch (action.type) {
    case 'CREATE_SURVEY_SUCCESS':
      return action.createSurveyItem;

    default:
      return state;
  }
}

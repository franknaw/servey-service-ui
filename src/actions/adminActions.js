
export function adminDeleteFormSuccess(deleteForm) {
  return {
    type: 'ADMIN_DELETE_FORM_SUCCESS',
    deleteForm
  };

}

export function createSurveyFormSuccess(createSurveyItem) {
  return {
    type: 'CREATE_SURVEY_SUCCESS',
    createSurveyItem
  };
}

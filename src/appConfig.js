

// import 'materialize-css'
// import 'normalize.css'
// import 'font-awesome'



export default {

  appId: "chm_survey",
  requestTimeout: 120000,
  surveyEndpoints: {
    "surveyNavigation" : "http://localhost:8092/survey",
    "surveyForm" : "http://localhost:8092/survey/form/",
    "surveyFormSubmit" : "http://localhost:8092/survey",
    "adminUpdateForm" : "http://localhost:8092/survey/admin/",
    "adminDeleteForm" : "http://localhost:8092/survey/admin/",
    "adminCreateForm" : "http://localhost:8092/survey/admin"
  },

  surveyEndpointsDev: {
    "surveyNavigation" : "http://localhost:3003/items",
    "surveyForm" : "http://localhost:3003/forms",
    "surveyFormSubmit" : "http://localhost:3003/items",
  }

}



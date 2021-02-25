import {combineReducers} from 'redux';
import {navItems, navHasErrored, navIsLoading} from './survey/navReducer';
import {
  formItems,
  formHasErrored,
  formIsLoading,
  submitFormItems,
  submitFormHasErrored,
  submitFormIsLoading
} from './survey/formReducer';

const rootReducer = combineReducers({
  navItems, navHasErrored, navIsLoading,
  formItems, formHasErrored, formIsLoading,
  submitFormItems, submitFormHasErrored, submitFormIsLoading
});

export default rootReducer;

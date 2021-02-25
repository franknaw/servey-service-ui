/** Reducers for survey navigation actions **/
export function navHasErrored(state = false, action) {
  switch (action.type) {
    case 'NAV_HAS_ERRORED':
      return action.navHasErrored;

    default:
      return state;
  }
}

export function navIsLoading(state = false, action) {
  switch (action.type) {
    case 'NAV_IS_LOADING':
      return action.navIsLoading;

    default:
      return state;
  }
}

export function navItems(state = [], action) {
  switch (action.type) {
    case 'NAV_FETCH_DATA_SUCCESS':
      return action.navItems;

    default:
      return state;
  }
}

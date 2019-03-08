const defaultState =  [];

export default  (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_TRANSACTIONS':
      return [...state, action.id] 
    case 'REMOVE_SELECTED_TRANSACTIONS':
      return state.filter((selectedId)=>{ return selectedId!==action.id});
    default:
      return state;
  }
}
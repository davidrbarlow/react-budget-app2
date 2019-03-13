const defaultState =  [];

export default  (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_TRANSACTION':
      return [...state, action.id] 
    case 'REMOVE_SELECTED_TRANSACTION':
      return state.filter((selectedId)=>{ return selectedId!==action.id});
    case 'REMOVE_SELECTED_TRANSACTIONS':
      return state.filter((selectedId)=>{ return !action.ids.includes(selectedId)});
    default:
      return state;
  }
}
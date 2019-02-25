import moment from 'moment';

const filterReducerDefaultState = {  
    text: '',
    sortBy: 'date', 
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = filterReducerDefaultState, action) =>{
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
            ...state,
            text: action.text
            }
        case 'AMOUNT_SORT':
            return {
            ...state,
            sortBy: 'amount'
            }
        case 'DATE_SORT':
            return {
            ...state,
            sortBy: 'date'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            }
            case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};
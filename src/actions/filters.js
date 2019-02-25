export const setTextFilter = (text = '') =>({
  type: 'SET_TEXT_FILTER',
  text
});

export const sortByAmount = () =>({
  type: 'AMOUNT_SORT',
});

export const sortByDate= () =>({
  type: 'DATE_SORT',
});

export const setStartDate= (startDate) =>({
  type: 'SET_START_DATE',
  startDate
});

export const setEndDate= (endDate) =>({
  type: 'SET_END_DATE',
  endDate
});
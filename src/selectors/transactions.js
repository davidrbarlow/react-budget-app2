import moment from 'moment';
//Get visible expenses


export default  (transactions, {text, sortBy, startDate, endDate}) => {
    return transactions.filter((transaction)=>{
        const postedAtMoment = moment(transaction.postedAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(postedAtMoment, 'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(postedAtMoment, 'day'): true;
        const textMatch = transaction.description.toLowerCase().includes(text.toLowerCase());
        const projectionNoMatch = transaction.accountType !== 'Projection';
       // console.log('transaction from selectors', transaction);
        return startDateMatch && endDateMatch && textMatch && projectionNoMatch;

    }).sort((a,b)=>{
        if (sortBy === 'date'){
            return a.postedAt<b.postedAt ? 1 : -1;
        }
        if (sortBy === 'amount') {
          //  return a.amount < b.amount ? 1 : -1
           return  b.amount - a.amount; 
        }
        else{
          return a.postedAt<b.postedAt ? 1 : -1;
        }
    });
};
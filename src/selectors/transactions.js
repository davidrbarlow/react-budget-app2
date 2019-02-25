import moment from 'moment';
//Get visible expenses


export default  (transactions, {text, sortBy, startDate, endDate}) => {
    console.log('text',text);
    return transactions.filter((transaction)=>{
      console.log('transactions',transactions);
        const postedAtMoment = moment(transaction.postedAt);
        console.log(postedAtMoment);
        const startDateMatch = startDate ? startDate.isSameOrBefore(postedAtMoment, 'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(postedAtMoment, 'day'): true;
        const textMatch = transaction.description.toLowerCase().includes(text.toLowerCase());
        console.log('startdatematch: ', startDateMatch,' endDateMatch ',endDateMatch,' textMatch ',textMatch);
        return startDateMatch && endDateMatch && textMatch;

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
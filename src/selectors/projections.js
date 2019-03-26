import moment from 'moment';
//Get visible expenses


export default  (transactions, {text, sortBy, startDate, endDate}) => {


  // returns an array of initial values to project
    const createProjectionSeed = (transactions) => {
      // get latest projections.
      // order projections by date and description(remove all numbers from description).
      // push the last of of each to array.
     
      return transactions.sort((a,b) => {
        // const aDescr = a.description.replace(/\d+/g, '');
        // const bDescr = b.description.replace(/\d+/g, '');
        const aDescr = a.description;
        const bDescr = b.description;
        if (aDescr === bDescr){
          return (a.postedAt<b.postedAt) ? 1 : -1
        }
        else {
          return (aDescr < bDescr) ? 1 : -1
        }
        
      }).filter((o, i) => {
        if (i){
          if (o.description.replace(/\d+/g, '') !== transactions[i-1].description.replace(/\d+/g, '')){
            console.log(o.description.replace(/\d+/g, ''), 'does not equal ', transactions[i-1].description.replace(/\d+/g, ''));
            return true;
          } 
            console.log('removing... ', o.description)
            return false;
        }
        return true;
      });
    

    }

    const projectTransactions = (transactions) => {
      let projections = [];
      transactions.sort((a,b)=>{
        return a.postedAt>b.postedAt ? 1 : -1;
      }).forEach((transaction) => {
        
        const accountType = transaction.accountType;
        const amount = transaction.amount;
        const balance = transaction.balance;
        const cycle = transaction.cycle;
        const description = transaction.description;
  
        const postedAtEndDate = moment(transaction.postedAt);
        postedAtEndDate.add(2,'month');
        console.log('start transaction ',cycle, description);
        switch(cycle){
          case 'Monthly' : 
          { 
            let postedAtMoment =  moment(transaction.postedAt);
            postedAtMoment.add(1,'month');
            while (postedAtMoment <= postedAtEndDate){
              projections.push({
                postedAtMoment,
                accountType,
                amount,
                balance,
                cycle,
                description
              });
              postedAtMoment.add(1,'month');
            }
            break;
          }
          case 'Bi-weekly':
          {
            let postedAtMoment =  moment(transaction.postedAt);
            postedAtMoment.add(2,'week');
            while (postedAtMoment <= postedAtEndDate){
              console.log('processing BW - ',cycle,description, postedAtMoment.calendar());
              projections.push({
                postedAtMoment,
                accountType,
                amount,
                balance,
                cycle,
                description
              });
              postedAtMoment.add(2,'week');
            }
           break;
          }
          default : 
          {
          
          }
        }
  
       // console.log('**************************',postedAtMoment, accountType);
      });

    };
   

    const filterProjections = (transactions) => {

      return transactions.filter((transaction)=>{
        const postedAtMoment = moment(transaction.postedAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(postedAtMoment, 'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(postedAtMoment, 'day'): true;
        const textMatch = transaction.description.toLowerCase().includes(text.toLowerCase());
        const projectionNoMatch = transaction.accountType === 'Projection';
       // console.log('********transaction from selectors', transaction);
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
  

    

    const test = createProjectionSeed(transactions);
    console.log('createProjectionSeed ', test);
    return filterProjections(transactions);
  
};
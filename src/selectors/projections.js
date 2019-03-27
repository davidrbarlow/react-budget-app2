import moment from 'moment';

//Get visible expenses


export default  (transactions, filters) => {

  const projectionSeedData = createProjectionSeed(transactions);
  console.log('createProjectionSeed ', projectionSeedData);
  const projections = projectTransactions(projectionSeedData);
  console.log('manual balances ',findSeedBalance(transactions))
  console.log('projections ', [...transactions,...projections]);
  return filterProjections([...transactions,...projections],filters);

};

  //find most recent of the 2 - earliest balance or 
  //latest manually added balance.

  const findSeedBalance = (transactions) => {
    const manualBalance = transactions.filter((transaction)=>{
      return (transaction.accountType === 'Balance') ? 1 : 0;
    });
    return(manualBalance);

  };

  const addBalances = (transactions) => {


  };





  // returns an array of initial values to project
  // I'm ordering by description (removing any numbers) then date.  
  // Grabbing the latest row for a group of descriptions.
    const createProjectionSeed = (transactions) => {
     
      return transactions.sort((a,b) => {
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

    // takes in a set of transactions and projects forward 2 months


    const projectTransactions = (transactions) => {
      let projections = [];
      let _id = 0;
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
        switch(cycle){
          case 'Monthly' : 
          { 
            let postedAtMoment =  moment(transaction.postedAt);
            postedAtMoment.add(1,'month');
            while (postedAtMoment <= postedAtEndDate){
              _id += 1;
              projections.push({
                _id,
                postedAt: postedAtMoment.unix()*1000,
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
              _id += 1;
              projections.push({
                _id,
                postedAt: postedAtMoment.unix()*1000,
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
       
      });
      return projections
    };
   

    //takes transactions and filters and returns filtered array of transacions/projections
    const filterProjections = (transactions, {text, sortBy, startDate, endDate}) => {

      return transactions.filter((transaction)=>{
        const postedAtMoment = moment(transaction.postedAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(postedAtMoment, 'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(postedAtMoment, 'day'): true;
        const textMatch = transaction.description.toLowerCase().includes(text.toLowerCase());
        //const projectionNoMatch = transaction.accountType === 'Projection';
       // console.log('********transaction from selectors', transaction);
        return startDateMatch && endDateMatch && textMatch;// && projectionNoMatch;

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
  

    

    
   // return filterProjections(transactions);
  

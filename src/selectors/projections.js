import moment from 'moment';

//Get visible expenses


export default  (transactions, filters) => {

  // returns an array of initial values to project (ie, transactions with cycle defined)
  const projectionSeedData =  createProjectionSeed(transactions);
  // creates future transactions based on cycle (ie, bi-weeks , monthly, etc).
  const projections =  projectTransactions(projectionSeedData);
  // finds projections added by the user
  const userAddedProjections = manuallyAddedProjections(transactions);
  // finds the transactions that are not user created projections
  const withoutUserAddedProjections = withoutAddedProjections(transactions);
  // finds a balance to start with
  const balanceSeedData =  findBalanceSeed(transactions);
  // finds running sum given projections and a transaction as a starting balance
  const projectionsWithBalances =  createProjectionBalances([...projections,...userAddedProjections],balanceSeedData);
  // applies filters in header to projections
  const filteredProjections =  filterProjections([...projectionsWithBalances,...withoutUserAddedProjections],filters);
  //update filter defaults on the projection page.
  return  filteredProjections;

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
         // console.log(o.description.replace(/\d+/g, ''), 'does not equal ', transactions[i-1].description.replace(/\d+/g, ''));
          return true;
        } 
          return false;
      }
      return true;
    });
  

  }

  //find most recent of the 2 - earliest balance or 
  //latest manually added balance.

  const findBalanceSeed = (transactions) => {
    const manualBalance = transactions.filter((transaction)=>{
      return (transaction.cycle === 'Balance' ? 1 : 0);
    }).sort((a,b)=>{
      return a.postedAt>b.postedAt ? 1 : 0;
    })[0];
    
    const importedBalance = transactions.filter((transaction)=>{
      return (transaction.balance && transaction.cycle !== 'Balance' ? 1 : 0);
    }).sort((a,b)=>{
      return a.postedAt<b.postedAt ? 1 : 0;
    })[0];
    
    return(manualBalance ? manualBalance : importedBalance);

  };

  // adds running sum to projected data
  const createProjectionBalances = (projections, seedBalance) => {
    let projectionsWithBalance = []
    const rsum1 = projections.filter((projection)=>(
      projection.postedAt>seedBalance.postedAt ? 1 : 0
    )).sort((a,b)=>{
      return a.postedAt>=b.postedAt ? 1 : -1;
    });

   // const reduce1 = rsum1.reduce((a,b)=>{
    rsum1.reduce((a,b)=>{
      const rsum = a.rsum + b.amount;
      projectionsWithBalance.push({
        ...b, rsum
      });
      return ({rsum: a.rsum + b.amount});
    },{rsum: 0});


    const projectionsBeforeSeedBalance = projections.filter((projection)=>(
      projection.postedAt<=seedBalance.postedAt ? 1 : 0
    ));
    return([...projectionsWithBalance,...projectionsBeforeSeedBalance]);
  };

  //finds manually added projected data
  const manuallyAddedProjections = (transactions) => {
    return transactions.filter((transaction)=>(
      (transaction.accountType === 'Projection') ? 1 :0
    ));
  }

  //get transactions without manually added data
  const withoutAddedProjections = (transactions) => {
    return transactions.filter((transaction)=>(
      (transaction.accountType !== 'Projection') ? 1 :0
    ));
  }
  

    // takes in a set of transactions and projects forward 2 months


    const projectTransactions = (transactions) => {
      let projections = [];
      let _id = 0;
      transactions.sort((a,b)=>{
        return a.postedAt>b.postedAt ? 1 : -1;
      }).forEach((transaction) => {
        
        const accountType = 'Projected';
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
   

    //takes transactions and filters -> returns filtered array of transacions/projections
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
  

    

    
  

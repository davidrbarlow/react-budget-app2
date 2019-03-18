import moment from "moment";


export default [{
  "_id" : "5c705b052c747592ec78279d",
  "amount" : 4000,
  "postedAt" : 0,
  "balance" : 8111.86,
  "description" : "Online Transfer from CHK ...3025 transaction#: 7899743059",
  "accountType" : "Bank",
},{
  "_id" : "5c705b052c747592ec78279a",
  "amount" : -1096.34,
  "postedAt" : moment(0).subtract(4, 'days').valueOf(),
  "balance" : 3017.1,
  "description" : "USBANK LOAN      PAYMENT                    PPD ID:  580580574",
  "accountType" : "Bank",
},{
  "_id" : "5c705b052c747592ec78279c",
  "amount" : -140,
  "postedAt" : moment(0).add(4, 'days').valueOf(),
  "balance" : 7971.86,
  "description" : "Online Payment 7899735230 To AT&T MOBILITY 02/01",
  "accountType" : "Bank",
}]
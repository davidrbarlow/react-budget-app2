

export default {
  post : jest.fn((url, cred) => {
    return new Promise((resolve, reject) => {

      const {email, password} = cred;
      var obj = { "headers" : {},
        "data" : {},};

      if(email === 'abc@123.com'){
        obj["headers"]["x-auth"]='asfadfasdfasdfadsf';
        obj["status"]=200;
       
        resolve(obj);
      }
      else{
        obj["status"]=400;
        obj["data"]["errmsg"]="duplicate key";
        obj["data"]["code"]=11000;
    
        resolve(obj);
      };
    
    });
  })
};


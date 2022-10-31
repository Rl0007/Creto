
Moralis.Cloud.define("getPassword",async function(request){
  const query = new Parse.Query("User");
  const result = await query.find({useMasterKey:true});
  const usersObj = result.filter{(data)=>{
    const recoveryPhrase=data.attributes.recoveryPhrase;
    if(recoveryPhrase===request.params.recoveryPhrase){
      return data}
  })
  return usersObj;});

Moralis.Cloud.define("getUser",async function(request){
  const query = new Parse.Query("User");
  const result = await query.find({useMasterKey:true});
  
  const usersObj = result.filter((data)=>{
    const userName = data.attributes.username;
    if(userName === request.params.userName){
      return data
    }
  })
  return request.params.userName && request.params.userName.length>0?usersObj:[];
});
Moralis.Cloud.define("getPassword",async function(request){
  const query = new Parse.Query("User");
  const result = await query.find({useMasterKey:true});
  const usersObj = result.filter((data)=>{
    const recoveryPhrase=data.attributes.recoveryPhrase;
    if(recoveryPhrase===request.params.recoveryPhrase){
      return data}
  })
  return usersObj;});

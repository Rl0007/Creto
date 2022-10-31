const { default: Moralis } = require("moralis/types");

Moralis.Cloud.define("getUser", async function (request) {
  const query = new Parse.Query("User");
  const logger = Moralis.Cloud.getLogger();
  logger.info("this is working");
  const result = await query.find({ useMasterKey: true });
  const usersObj = result.filter((data) => {
    const userName = data.attributes.username;
    if (userName === request.params.userName) {
      return data;
    }
  });
  return request.params.userName && request.params.userName.length > 0
    ? usersObj
    : [];
});

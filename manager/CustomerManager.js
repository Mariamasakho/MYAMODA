const OrmManager = require("./ORMManager");

class CustomerManager extends OrmManager {
  constructor(wagner) {
    super(wagner.get("user"));
    this.wagner = wagner;
  }

  register(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const exists = await this._findOne({
          username: options.username,
          fname: options.fname,
          lname: options.lname,
        });
        if (exists) return reject(new Error("User already exists!"));

        this._createOne(options)
          .then((result) => resolve(result.toJSON()))
          .catch((error) => reject(error));
      } catch (error) {}
    });
  }

  login(options) {
    return new Promise(async (resolve, reject) => {
      const user = await this._findOne(options);
      if (!user) return reject(new Error("Invalid account credentials"));
      if(!user.status) return reject(new Error("Account not activated yet!"));
      
      resolve(user.toJSON());
    });
  }
}

module.exports = CustomerManager;

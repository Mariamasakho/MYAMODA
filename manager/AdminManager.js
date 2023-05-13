const OrmManager = require('./ORMManager')

class AdminManager extends OrmManager {
  constructor(wagner) {
    super(wagner.get("admin"))
    this.wagner = wagner;
    
  }

  register(options) {
    return new Promise(async (resolve, reject) => {
      this._createOne(options)
        .then((result) => resolve(result.toJSON()))
        .catch((error) => reject(error));
    });
  }

  login(options) {
    return new Promise(async (resolve, reject) => {
        const user = await this._findOne(options)
        if (!user) return reject(new Error("Invalid account credentials"))
        resolve(user.toJSON())
    });
  }

  
}

module.exports = AdminManager;

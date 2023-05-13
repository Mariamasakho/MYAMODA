const OrmManager = require("./ORMManager");

class ProductManager extends OrmManager {
  constructor(wagner) {
    super(wagner.get("product"));
    this.wagner = wagner;
  }

  createOrEditProduct(options) {
    return new Promise(async (resolve, reject) => {
      try {
        if (options.productId) {
          this._editOne(options, options.productId)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        } else {
          const isExists = await this._findOne({ name: options.name });
          if (isExists)
            return reject(new Error("Product name already exists!"));

          this._createOne(options)
            .then((result) => resolve(result.toJSON()))
            .catch((error) => reject(error));
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = ProductManager;

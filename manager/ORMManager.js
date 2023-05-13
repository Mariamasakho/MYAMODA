class OrmManager {
  constructor(table) {
    this.Table = table;
  }

  _createOne(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = await this.Table.create(query);
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  }

  _findOne(query) {
    return new Promise((resolve, reject) => {
      this.Table.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  _editOne(query, id) {
    return new Promise((resolve, reject) => {
      this.Table.update(query, {
        where: { id },
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  _findAll(query) {
    return new Promise((resolve, reject) => {
      this.Table.findAll(query)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  _destroy(query) {
    return new Promise((resolve, reject) => {
      this.Table.destroy({ where: query })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }
}

module.exports = OrmManager;

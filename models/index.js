module.exports = (sequelize, wagner) => {
  const databases = ["admin",'product','user','order'];
  databases.forEach((item) => {
    const model = require(`./${item}.js`)(sequelize);

    if(model === 'order'){
      const user = require('./user')
      const product = require('./product')
      product.hasOne(model)
      user.hasOne(model)

    }

    wagner.factory(`${item}`, () => model);
  });
};

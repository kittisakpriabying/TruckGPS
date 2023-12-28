const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('TBLGPSDB', 'tblgpsuser', 'Tb1Gp$3erTr@cking', {
  host: '10.5.57.3',
  dialect: 'mssql' 
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
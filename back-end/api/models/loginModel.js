const fs = require('fs'); 
const parse = require('csv-parse');

const csvData = [];
const registeredUsers = [];
fs.createReadStream('api/models/data.csv')
  .pipe(parse({ delimiter: ':' }))
  .on('data', (csvrow) => {
    csvData.push(csvrow);        
  })
  .on('end', () => {
    csvData.forEach((data) => {
      const email = data[0].split(',')[2].trim();
      registeredUsers.push({
        email,
        password: '123',
        admin: email === 'marc.moosreiner@cct-ev.de'
          || email === 'philipp.klaege@cct-ev.de'
          || email === 'daniel.koester@cct-ev.de'
          || email === 'florian.woelki@cct-ev.de',
        token: email,
      });
    });
  });

module.exports = {
  registeredUsers,
};

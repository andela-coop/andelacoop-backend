/* eslint-disable no-console */
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const { Client } = require('pg');
const moment = require('moment');


console.log('Getting postgres URL');
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.js`)[env];

if (!config.url) {
  console.error('Postgres url not found. Please ensure you set one in your env.');
  process.exit(1);
}

const client = new Client({
  connectionString: config.url,
});


function readFile() {
  const arr = [];

  fs.createReadStream(path.join(__dirname, '../andelacoop.csv'))
    .pipe(csvParser())
    .on('data', (row) => {
      arr.push(row);
    })
    .on('end', () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [index, item] of arr.entries()) {
        const id = parseInt(item.membershipNo, 10);
        const date = moment().format('YYYY-MM-DD HH:mm');
        client.query(
          `
            DO $$
            BEGIN
              IF NOT EXISTS ( SELECT 1 FROM "Users" WHERE "membershipNo" = ${id} )
              THEN
                INSERT INTO "Users" ("membershipNo", "firstName", "middleName", "lastName", "password", "createdAt", "updatedAt") VALUES (${id}, '${item.firstName}', '${item.middleName}', '${item.lastName}', 'random', '${date}', '${date}');
              END IF;
            END $$;
            `,
        ).then(() => {
          if (index === arr.length - 1) {
            client.end();
            console.log('User data seeded successfully!');
          }
        }).catch((e) => {
          console.log('An error occured', e.message);
          if (index === arr.length - 1) {
            client.end();
          }
        });
      }
      // client.end();
    });
}

console.log('Connecting to postgress');
client.connect().then(() => {
  console.log('Seeding user data');
  readFile();
}).catch((e) => {
  console.log(`Unable to connect to postgres: ${e.message}`);
});

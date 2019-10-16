/* eslint-disable no-console */
const fs = require('fs');
const csvParser = require('csv-parser');
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

const filePath = process.argv[2];

const client = new Client({
  connectionString: config.url,
});

function seedData(data) {
  // eslint-disable-next-line no-restricted-syntax
  for (const [index, item] of data.entries()) {
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
      if (index === data.length - 1) {
        client.end();
        console.log('User data seeded successfully!');
      }
    }).catch((e) => {
      console.log('An error occured', e.message);
      if (index === data.length - 1) {
        client.end();
      }
    });
  }
}


function readFile() {
  const arr = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      arr.push(row);
    })
    .on('end', () => {
      console.log('Seeding data to the database...');
      seedData(arr);
    });
}

function connect() {
  client.connect().then(() => {
    console.log('Reading data from csv..');
    readFile();
  }).catch((e) => {
    console.log(`Unable to connect to postgres: ${e.message}`);
  });
}

try {
  if (fs.existsSync(filePath)) {
    connect();
  } else {
    console.log('File could not be found. Please add an absolute path. e.g /Users/username/path/to/file.csv');
    process.exit(1);
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

console.log('Connecting to postgress');

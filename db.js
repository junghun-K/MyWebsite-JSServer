// // This is an entirely fake version of this database file.
// // Your job will be to rewrite this file to use an actual database.
// // You'll know you've done it when you can restart the server and still use it!
var mysql = require("mysql");

var connPool = mysql.createPool({
  connectionLimit: 5, // it's a shared resource.
  host: "cse-mysql-classes-01.cse.umn.edu", // cse-mysql-classes-01.cse.umn.edu || 127.0.0.1
  user: "C4131F22U53",
  database: "C4131F22U53",
  password: "admin" // C4131F22U53: admin
});

async function getContacts(optradio) {
  return new Promise((resolve, reject)=>{
    let sql = 'select * from contacts';
    if (optradio != 'all') {
      // console.log(optradio);
      sql = 'select * from contacts where category=?';
      connPool.query(sql, optradio, (err, rows)=> {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    } else {
      connPool.query(sql, (err, rows)=> {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    }    
  })
}
exports.getContacts = getContacts

async function addContacts(username, email, title, category, message, link) {
  return new Promise((resolve, reject)=>{
    const sql = 'insert into contacts (username, email, title, category, message, link) values (?, ?, ?, ?, ?, ?)';
    connPool.query(sql, [username, email, title, category, message, link], (err, rows)=>{
      if (err) {
        console.log('error')
        reject(err);
      } else {
        console.log('resolved')
        resolve(rows)
      }
    })
  })
}
exports.addContacts = addContacts


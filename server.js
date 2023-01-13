/* Converted nullish coalescing (??) to OR operator (||)
because CSELab Machine does not like ?? */

const express = require("express");
const session = require('express-session');


// IMPORT db file
var db = require("./db");
// global variables
var logged_in = false;
var data = {clickCount: 0};

// setup the app object
const app = express();
const PORT = 3006


app.use(express.static("resources/"));
// Parse URL-encoded bodies requires express 4.16+
// (older versions of express had external libraries for this)
app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"oauhsdlmfnaliustydfialjbkwegf"}))

app.set("views", "templates");
app.set("view engine", "pug");


/* GET */
app.get("/", function(req, res) {
    res.redirect("/myAboutMe")
});
 
app.get("/myAboutMe", async function(req, res) {
  let username = req.session.username || "login";
  res.render("myAboutMe.pug", {username: username})
});

app.get("/myWidgets", async function(req, res) {
  let username = req.session.username || "login";
  res.render("myWidgets.pug",{username: username})
});

app.get("/myContacts", async function(req, res) {
  let username = req.session.username || "login";
  res.render("myContacts.pug", {username: username})
});

app.get("/contactMe", async function(req, res) {
  let username = req.session.username || "login";
  res.render("contactMe.pug", {username: username})
});

app.post("/contactMe", async function(req, res) {
  let name = req.body.username || null;
  let email = req.body.email || null;
  let title = req.body.postTitle || null;
  let category = req.body.category || null;
  let message = req.body.message || null;
  let link = req.body.link || null;
  let message_status = "";
  let message_bool = false;

  try {
    await db.addContacts(name, email, title, category, message, link);
    console.log('Succeeded');
    message_status = "Your message has been recieved!"
  } catch {
    console.log('FAILED');
    message_status = "Your message has been failed to send! Try again!"
  }
  message_bool = true;

  let username = req.session.username || "login";
  res.render("contactMe.pug", {username: username, message_status:message_status, message_bool:message_bool})
});

app.get("/login", async function(req, res) {
  let username = req.session.username || "login";
  res.render("login.pug", {username: username, logged_in: logged_in});
});

app.post("/login", async function(req, res) {
  req.session.username = req.body.username || "login";
  if (req.session.username == "") {
    req.session.username = "anonymous"
  }
  logged_in = !logged_in
  res.redirect("/myAboutMe")
});

app.post("/logout", async function(req, res) {
  req.session.username = "login";
  logged_in = !logged_in
  res.redirect("/myAboutMe")
});

app.get('/api/click', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data)); 
  // res.json(data) - respond with json once then return html
});

app.post('/api/click', async function(req, res) {
  data['clickCount'] += 1;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data)); 
});

app.get('/contactLog', async function(req, res) {
  let optradio = req.query.optradio || 'all';
  let username = req.session.username || "login";
  req.session.optradio = optradio;
  let contacts = await db.getContacts(optradio);
  res.render("contactLog.pug",{username: username, contacts:contacts, optradio:optradio})
});

// Start the web server
app.listen(PORT, function() {
   console.log(`Listening on http://localhost:${PORT}`);
});
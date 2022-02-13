const express = require( "express" );
const app = express();
const middleware = require( "./routes" );
app.use( middleware );
app.set( "view engine", "pug" );
app.get( "/", ( req, res ) => {
  res.render( "index", {
    title: "Ginger/Headspace Health Take-Home Challenge",
    message: "Home",
    note: "Please view README.md for notes.",
    navigation: [ "/authors", "/articles" ],
  } );
} );
module.exports = app;

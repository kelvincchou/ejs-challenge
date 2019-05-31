//jshint esversion:6

const express = require("express"); //web server
const bodyParser = require("body-parser"); //help express to handle post request
const ejs = require("ejs"); //template, check views folder
const _ = require("lodash"); //make text into same format

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];  //declare empty array


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/", (req, res) => {         //Go to root route
	res.render("home", {homeStartingContent:homeStartingContent, posts:posts});    //look in views/home.ejs
});


app.get("/about", (req, res) => {         //Go to about route
        res.render("about", {aboutContent:aboutContent});    //look in views/about.ejs
});

app.get("/contact", (req, res) => {         //Go to contact route
        res.render("contact", {contactContent:contactContent});    //look in views/about.ejs
});


app.get("/compose", (req, res) => {         //Go to compose route
        res.render("compose");    //look in views/compose.ejs
});

app.post("/compose", (req, res) => {         //Go to compose route
       //  console.log(req.body);
       //  console.log(req.body.postTitle);
         const post = {
      		title: req.body.postTitle,
		content: req.body.postBody
		};
         posts.push(post);
      //	 console.log(posts);
         res.redirect("/");
});

app.get("/post/:postName", (req, res) => {
   //console.log(req.params.postName);
   const requestedTitle = _.lowerCase(req.params.postName);
   posts.forEach((post) => {
        const storedTitle = _.lowerCase(post.title);
        const storedContent = post.content;
   	if(storedTitle === requestedTitle) {
 		console.log("found");
                res.render("post", {storedTitle:post.title, storedContent:storedContent});
       } else {
                 console.log("not found");
       };    //end of if
   });  //end of for Each 
});  //end of app.get

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

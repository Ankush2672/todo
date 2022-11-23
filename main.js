const express = require('express')
const fs = require("fs");
const app = express()
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/save", (req, res) => {

fs.readFile("./file.txt","utf-8",function(err,data){

	let todo;
	if(data.length===0)
	{
     todo = [];
	}
	else
	{
		todo = JSON.parse(data);
	}
let y,k=0;
console.log(req.body);
		for( y=0;y<todo.length;y++)
		{

			if(todo[y].id == req.body.id)
			{
	      if(req.body.del==1)
				{
					console.log("in",y);
           todo.splice(y,1);
				}
				else
				{
           todo[y]=req.body;
				}
				 
	      k=1
			}
		}
		if(k!=1)
		{
	    todo.push(req.body);
		}
//	console.log(req.body);


fs.writeFile("./file.txt",JSON.stringify(todo),function(err){

    res.end("ok");
});


});


//res.end("ok");
});


app.get("/read",(req,res) => {
	var sdata = [];

	fs.readFile("./file.txt","utf-8",function(err,data){
  
	if(data.length==0)
	{
		res.json(sdata);
	}
	else
	{

  sdata = JSON.parse(data);
	
   res.json(sdata);
	}
	});
	

});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

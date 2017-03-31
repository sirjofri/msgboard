HTMLCollection.prototype.foreach=function(f){for(var i=0;i<this.length;i++){f(this.item(i),i,this);}};

var Msgboard = function(output){
	this.out = output;
	this.send({text:"initialized",visibility:0});
};

Msgboard.prototype.send = function(msg) {
	if(typeof msg.text == "undefined")
		throw new SyntaxError("No text specified!");
	
	this.update();

	if(typeof msg.visibility == "undefined")
		msg.visibility = 1;
	
	this.out.innerHTML += "<p data-visibility=\""+msg.visibility+"\""+(typeof msg.css != "undefined"?" class=\""+msg.css+"\"":"")+">"+msg.text+"</p>";
};

Msgboard.prototype.update = function()
{
	this.out.getElementsByTagName("p").foreach((el)=>{
		var vis = +el.getAttribute("data-visibility");
		console.log(el);
		console.log(vis);
		if(vis == 1)
			el.parentNode.removeChild(el);
		if(vis > 1)
			el.setAttribute("data-visibility",vis-1);
	});
};

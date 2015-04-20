## xpathns.js
Wrapper for [xpath.js](https://www.npmjs.com/package/xpath.js) to allow namespaces in queries.

Examples in this README modified from xpath.js README.

## Install
Install with [npm](http://github.com/isaacs/npm):

    npm install xpathns.js

Install xpath.js and an XML engine (eg: [xmldom](https://github.com/jindw/xmldom)):

    npm install xpath.js xmldom


## Your first xpath with namespaces:
`````javascript
  var nsMap = {
    ns1: "urn:somenamespace"
  };
  
	var select = require("xpathns.js")(nsMap),
	    dom = require("xmldom").DOMParser;

	var xml = "<book xmlns=\"urn:somenamespace\"><title>Harry Potter</title></book>";
	var doc = new dom().parseFromString(xml);
	var nodes = select(doc, "//ns1:title")';
	
	console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
	console.log("node: " + nodes[0].toString());
`````
-->

	title: Harry Potter
	node: <title>Harry Potter</title>

## Get text values directly
`````javascript 
    var xml = "<book xmlns=\"urn:somenamespace\"><title>Harry Potter</title></book>";
    var doc = new dom().parseFromString(xml);
    var title = select(doc, "//ns1:title/text()")[0].data;

    console.log(title);
`````  
-->
    
    Harry Potter
	
## Attributes
`````javascript  
    var xml = "<book xmlns=\"urn:somenamespace\" author='J. K. Rowling'><title>Harry Potter</title></book>";
    var doc = new dom().parseFromString(xml);
    var author = select(doc, "/ns1:book/@author")[0].value;
        
    console.log(author);
`````
-->
    
    J. K. Rowling
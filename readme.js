"use strict";

var nsMap = {
  ns1: "urn:somenamespace"
};

var select = require("./src/xpathns.js")(nsMap),
    dom = require("xmldom").DOMParser;

var xml = "<book xmlns=\"urn:somenamespace\"><title>Harry Potter</title></book>";
var doc = new dom().parseFromString(xml);
var nodes = select(doc, "//ns1:title");

console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
console.log("node: " + nodes[0].toString());

console.log();

xml = "<book xmlns=\"urn:somenamespace\"><title>Harry Potter</title></book>";
doc = new dom().parseFromString(xml);
var title = select(doc, "//ns1:title/text()")[0].data;

console.log(title);

console.log();

xml = "<book xmlns=\"urn:somenamespace\" author='J. K. Rowling'><title>Harry Potter</title></book>";
doc = new dom().parseFromString(xml);
var author = select(doc, "/ns1:book/@author")[0].value;
console.log(author);
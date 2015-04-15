/*jshint expr: true*/

"use strict";

var fs = require("fs"),
    path = require("path");

var should = require("mocha-should");

var concat = require("concat-stream"),
    DOMParser = require("xmldom").DOMParser;

var nsMap = {
  ns1: "http://xpathns.js/"
};

var xpath = require("../src/xpathns")(nsMap),
    xpathAssertions = require("xpath.js-assertions")(xpath);

describe("XPathNS.js tests", function() {
  should("find text content", function(done) {
    var stream = fs.createReadStream(path.resolve(__dirname, "test.xml"));
    stream.pipe(concat(function(buf) {
      var doc = new DOMParser().parseFromString(buf.toString());
      xpathAssertions.init(doc);

      doc.has("/ns1:doc/ns1:section/ns1:text/text()").withTextValue("Hello World");

      done();
    }));

    stream.on("error", function(err) {
      done(err);
    });
  });
});
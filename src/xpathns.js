"use strict";

var xpath = require("xpath.js");

/* jshint freeze:false */
Array.prototype.unique = function() {
  return this.filter(function(val, i, arr) {
    return (i <= arr.indexOf(val));
  });
};
/* jshint freeze:true */

module.exports = function(nsMap) {
  return function select(doc, path) {
    var newXPath = path;
    var matches = path.match(/\w+:\w+/g);

    if (matches !== null) {
      var nsElements = matches.unique();

      if (nsElements) {
        nsElements.forEach(function(nsElement) {
          var components = nsElement.split(":");
          components[0] = nsMap[components[0]];

          var path = "*[local-name(.)='" + components[1] + "' and namespace-uri(.)='" + components[0] + "']";

          var re = new RegExp(nsElement, "g");
          newXPath = newXPath.replace(re, path);
        });
      }
    }

    return xpath(doc, newXPath);
  };
};
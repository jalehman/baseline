angular.module('templates-app', ['about/about.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div>\n" +
    "  <p class=\"lead\">\n" +
    "    This is the about page.\n" +
    "  </p>\n" +
    "</div>\n" +
    "");
}]);

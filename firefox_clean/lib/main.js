var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

pageMod.PageMod({
  include: ["*.buzzfeed.com"],
  contentScriptFile: [data.url("pos/lexicon.js"), data.url("pos/lexer.js"), data.url("pos/POSTagger.js"), data.url("cuss_list.js"), data.url("content_script.js")]
});

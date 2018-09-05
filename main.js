var email = "your@example.com";
var password = "****";
var enterpoint = "the entry point url";

var casper = require("casper").create({
  pageSettings: {
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"
  },
  viewportSize: {
    width: 320,
    height: 568
  }
});

casper.start(enterpoint);

casper.thenEvaluate(function() {
  document.querySelector("[name=Email]").value = email;
  document.querySelector("[name=Password]").value = password;
});

casper.thenClick("button#login", function() {
  this.echo("Submitting login form...");

  this.capture("debug_1_before_login.jpg", undefined, {
    format: "jpg",
    quality: 75
  });
});

casper.waitFor(
  function check() {
    return this.wait(3000, function() {
      this.echo("It has been submitted 3 seconds.");

      this.capture("debug_2_after_login.jpg", undefined, {
        format: "jpg",
        quality: 75
      });
    });
  },
  function then() {
    if (this.exists("#checkin")) {
      this.thenClick("#checkin", function() {
        this.evaluateOrDie(function() {
          return /今日已签到/.match(document.body.innerText);
        }, "签到成功");
      });
    } else {
      this.echo("今日已签到或者登录不成功");
    }
  }
);

casper.run();

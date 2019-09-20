browser.addCommand("isVideoPaused",function(){
  var isPaused=browser.selectorExecute('#dance-video',function(video){
    //var video=document.querySelector('#dance-video');
    return video[0].paused;
  });
  return isPaused;
});

describe("about us video",function(){
  beforeEach(function(){
    browser.url("http://www.kevinlamping.com/webdriverio-course-content/");
    browser.click("=About Us");
  });
    it("should open the model with video paused",function(){
      //console.log("outside the browser");
      var isPaused=browser.isVideoPaused();

        expect(isPaused).to.be.true;
    });

    it("should play video on clicking play",function(){
      browser.click("#play-btn");
      var isPaused=browser.isVideoPaused();
      expect(isPaused).to.be.false;
    });

    it("should pause the video on clicking pause",function(){
      browser.click("#play-btn");
      browser.pause(500);
      browser.click("#pause-btn");

      var isPaused=browser.isVideoPaused();
      expect(isPaused).to.be.true;
    });
});

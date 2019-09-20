describe("accordion",function(){
  var activeClass="is-active";
  beforeEach(function(){
    browser.url("http://www.kevinlamping.com/webdriverio-course-content/");
  })
  it("should have active class on first item to start",function(){
    var classNames=browser.getAttribute(".accordion .accordion-item:first-child","class");
    expect(classNames).to.contain("is-active");
  });
  it("should not have active class for other items to start",function(){
    var elementClassNames=browser.getAttribute(".accordion .accordion-item:not(:first-child)","class");
    elementClassNames.forEach(function(classNames){
      expect(classNames).to.not.contain("is-active");
    });
  });
  it("should remove the active class for the first item on the click",function(){
    browser.click(".accordion .accordion-item:nth-child(2) a");
    var classNames=browser.getAttribute(".accordion .accordion-item:first-child","class");
    expect(classNames).to.not.contain("is-active");
  })
  it("should add active class to second item on the click",function(){
    browser.click(".accordion .accordion-item:nth-child(2) a");
    var classNames=browser.getAttribute(".accordion .accordion-item:nth-child(2)","class");
    expect(classNames).to.contain("is-active");

  })

  it("should handle multiple clicks at one succession",function(){
    //run for loop for 20 times
    for(var x=0;x<20;x++){
      var num=(x%3)+1;
      browser.click(".accordion .accordion-item:nth-child("+ num +") a");
    }
    var classNames=browser.getAttribute(".accordion .accordion-item:nth-child("+ num +")","class");
    expect(classNames).to.contain("is-active");
  })
});

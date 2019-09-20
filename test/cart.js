var cart=require("./cart.page.js");
describe("cart functionality",function(){
  //var btn="#buyNowButton"
  //var qty="#qty"
  // var cart={
  //   get btn(){
  //     return $(btn);
  //   },
  //   get qty(){
  //     return $(qty);
  //   },
  //   get thankYou(){
  //     return $(".callout*=Thank you human");
  //   }
  // }
  //---above section was commented in order to implement the functionality using page objects.
  beforeEach(function(){
    browser.url("http://www.kevinlamping.com/webdriverio-course-content/product-page.html");
  });

  it("should only let you buy after setting a quantity",function(){
    var isBtnEnabled=cart.btn.isEnabled();
    expect(isBtnEnabled,"buy now should be disabled to begin").to.be.false;

    cart.qty.setValue(10);
    var isBtnenabled=cart.btn.isEnabled();
    expect(isBtnenabled,"buy now should be disabled to begin").to.be.true;
  });

  describe("checkout function",function(){
    beforeEach(function(){
      //add quantity to 10
    cart.qty.setValue(10);
    //click buyNow
    cart.btn.click();
    }) ;

  it("should disable buyNnow button during processing",function(){
    //verify buynow is disabled
    var isBtnEnabled=cart.btn.isEnabled();
    expect(isBtnEnabled,"'buyNow' should be disabled after clicking").to.be.false;

    var btnText=cart.btn.getText();
    expect(btnText,"verify buyNow text has changed").to.contain("Purchasing");
    });

  it("should show a thankyou message with quantity and type",function(){
      //var thankYou=".callout*=Thank you human";
      cart.thankYou.waitForExist();
      //wait for exist thankYou message
      //browser.waitForExist(thankYou,3000);
      //verify it has property quantity and type
      var thankText=cart.thankYou.getText();
      expect(thankText).to.contain("Thank you human for your purchase of 10 T-800 Model 101 robot(s).");
    });


    it("should clear input after completion",function(){
      //wait for value for qty input
      cart.qty.waitForValue(null, true);
    });

    it("should reset text after purchase is totally complete",function(){
        //wait for button to return back to 'buyNow'
        browser.waitUntil(function(){
          console.log('here');
          return cart.btn.getText() !== 'Purchasing...'
        },3000);
        //verify bytton now says buy now
        var btnText=cart.btn.getText();
        expect(btnText).to.equal('Buy Now');
      });

    it("should hide thankyou message after clicking close button",function(){
      //var thankYou=$(".callout*=Thank you human");
      //wait for exist "thankyou message"
      cart.thankYou.waitForExist(3000);
      //click the close button
      $(".close-button").click();
      //use "reverse" flag to wait for it to disappear
      cart.thankYou.waitForVisible(null,true);
    });
  });
});

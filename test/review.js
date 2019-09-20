var request=require('sync-request');
var reviewForm=require('./reviewForm.page.js');
var Review=require("./Review.page.js");

describe("the product review form",function()
{
  beforeEach(function(){
    browser.url("https://www.kevinlamping.com/webdriverio-course-content/product-page.html");
    });

  it("should add review when submitted properly",function()
  {
    reviewForm.submit("email@example.com","this is the review");
    //this.timeout(99999999);
    //browser.debug();
    //assert that our review now appears in our List
    var hasReview=browser.isExisting(".comment=this is the review");
    expect(hasReview,"comment text exists").to.be.true;
    });


  //it should show an error message when input is wrong
it("should show an error message when input is wrong",function(){
  //assert that error message isnt showing to start
  var isErrorShowing=reviewForm.formError.isVisible();
  expect(isErrorShowing).to.be.false;
  //submit form without content
  reviewForm.submit();

  //assert that error message is now showing
  var isErrorShowing=reviewForm.formError.isVisible();
  expect(isErrorShowing).to.be.true;

});

  //it should hide the errror message when input is correct
  it("should hide the error message when input is corrected",function(){
  //submit the form without entering the contents
    reviewForm.submit();
    //assert that error is now showing
    var isErrorShowing=reviewForm.emailError.isVisible();
    expect(isErrorShowing).to.be.true;

    reviewForm.submit("email@example.com");
    // move focus
    browser.click("#review-content")

    var isErrorShowing=reviewForm.emailError.isVisible();

    expect(isErrorShowing).to.be.false;
    reviewForm.submit("email@example.com","this is the review");

    var isMainErrorShowing=reviewForm.formError.isVisible();
    var isContentErrorShowing=reviewForm.reviewError.isVisible();
    expect(isMainErrorShowing).to.be.false;
    expect(isContentErrorShowing).to.be.false;
  });
  //it should focus on first invalid input field on error
  it("should focus on first invalid input field on error",function(){
    var emailHasFocus=browser.hasFocus("#review-email");
    expect(emailHasFocus,"should not have focus").to.be.false

    reviewForm.submit();


    emailHasFocus=browser.hasFocus("#review-email");
    expect(emailHasFocus,"should now have focus").to.be.true

    reviewForm.submit("email@example.com");

    var contentHasFocus=browser.hasFocus("#review-content");
    expect(contentHasFocus,"review content field now have focus").to.be.true
  });

  it("should allow multiple sync-request",function(){
    var res=require("GET","http://jsonplaceholder.typicode.com/posts/1/comments");
    var comments=JSON.parse(res.getBody().toString('utf8'));
    comments.forEach(function(comment,idx)
    {
      reviewForm.submit(comment.email,comment.name);
      var review=new Review(idx + 3);
      
      var email=review.email.getText();
      expect(email).to.equal(comment.email);

      var reviewText=review.comment.getText();
      expect(reviewText).to.equal(comment.name);
    });
  });

});

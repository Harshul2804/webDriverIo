require('chai').should();

describe('shop CTA button', function()
{
  it('should link to the product page',function()
  {
    
browser.url('http://www.kevinlamping.com/webdriverio-course-content/')
var title=browser.getTitle()
// assert.equal(title,'Robot Parts Emporium');
title.should.equal('Robot Parts Emporium');

browser.click('.shop-callout a')
//browser.debug();

var ProductTitle=browser.getTitle()
// assert.equal(ProductTitle,'Totally Not Evil Sentient Robot - Robot Parts Emporium');
ProductTitle.should.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');

var url=browser.getUrl()
// var containsFile = url.includes('product-page.html');
// assert.includes(url,'product-page.html','Url mismatch');
url.should.include('product-page.html','Url mismatch');

});
});

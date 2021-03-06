//ref: https://www.npmjs.com/package/jasmine-jquery
$(function() {
  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('has its own non empty url', function() {
      allFeeds.forEach(function(feed){
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe("");
      });
    });

    it('has its own non empty name', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe("");
      }
    });
  });

  describe('The menu', function() {

    it('is hidden by default', function() {
      expect($('body')).toHaveClass('menu-hidden'); // the trick is in the menuIcon eventListener!
    });

    it('be visible when the icon clicked', function() {
      $('.menu-icon-link').click(); //clicking the icon will toggle menu-hidden class on body tag,causing the hiding/unhiding each time.
      expect($('body')).not.toHaveClass('menu-hidden');
      $('.menu-icon-link').click();
      expect($('body')).toHaveClass('menu-hidden');
    });

  });

  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    //ref: https://stackoverflow.com/questions/24090270/how-can-i-test-that-a-value-is-greater-than-or-equal-to-in-jasmine
    it('should grab feeds', function() {
      var entries = $('.feed .entry').length;
      expect(entries).toBeGreaterThan(0);
    });

  });

  describe('New Feed Selection', function() {
    var feed0;
    beforeEach(function(done) {
      loadFeed(0, function() {
        feed0 = $('.feed').html();//storing first data in the variable
        loadFeed(1, function() { // call for the second feed
          done();
        });
      });
    });
    it('load new feed each time', function() {
      expect($('.feed').html()).not.toEqual(feed0);//calling $('.feed').html() will bring the second feed added
    });

  });

}());
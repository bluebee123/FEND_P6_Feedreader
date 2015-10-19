/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feedObject) {
                expect(feedObject.url).toBeDefined();
                expect(feedObject.url).not.toBe("");
            });
        });
        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(function(feedObject) {
                expect(feedObject.name).toBeDefined();
                expect(feedObject.name).not.toBe("");
            });
        });
    });
    /* DONE: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.


         The body has the class menu-hidden when the menu is hidden (it is moved out of the viewport by -13em)
         */
        it('is hidden by default', function() {
            expect($('body').attr("class")).toBe("menu-hidden");
        });
        /* DONE: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.

           relevant code in app:
          menuIcon.on('click', function() {
               $('body').toggleClass('menu-hidden');
           });
         */
        it('hides and displays on button click', function() {
            //trigger the first click
            $('.menu-icon-link').trigger("click");
            //body should now not have a class
            expect($('body').attr("class")).toBe("");
            //trigger another click
            $('.menu-icon-link').trigger("click");
            //menu should be hidden again, so menu-hidden class on body
            expect($('body').attr("class")).toBe("menu-hidden");
        });
    });
    /* DONE: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            //load the first feed
            loadFeed(0, function() {
                done();
            });
        });
        it('runs successfully', function(done) {
            //the  length of list of .entry elements should be longer than 0
            expect($('.entry').length).not.toBe(0);
            done();
        });
    });
    /* DONE: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        //remember the lastContents html
        var lastContent;
        beforeEach(function(done) {
            lastContent = $(".feed").html();
            //load a different feed than the initial one (which would be 0)
            loadFeed(3, function() {
                done();
            });
        });
        it('changes content', function(done) {
            //new .feed.html should be different from the lastContent variable.
            expect($(".feed").html()).not.toBe(lastContent);
            done();
        });
    });
}());
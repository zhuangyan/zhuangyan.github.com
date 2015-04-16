/*

Based on jquery-pjax by Chris Wanstrath
https://github.com/defunkt/jquery-pjax/blob/master/LICENSE

Main customisations made are:

- Extracting content from <body> tag, since no server-side support.
- Fade in/out animations between loading pages.
- Scrolling to top when page loaded.
- Calling our own pageLoad() function (from main.js).

*/

var pjaxSetup = function() {

  var active = false;
  var initial = true;

  var contents = function(html, tag) {
    if (html.indexOf('<' + tag + '>') >= 0) {
      return html.split('<' + tag + '>')[1].split('</' + tag + '>')[0];
    }
    return '';
  };

  var pjax = function(url, push) {
    $('.main').fadeTo(0, .5);
    $.get(url, {pjax: 1}, function(html) {
      $('.main').fadeTo(0, 1);
      var title = contents(html, 'title');
      var body = contents(html, 'body');
      if (push) {
        if (!active) {
          active = true;
          window.history.replaceState({}, document.title);
        }
        window.history.pushState({url: url}, document.title, url);
      }
      document.title = title;
      document.getElementsByTagName('body')[0].innerHTML = body;
      scrollTo(0, 0);
      pageLoad();
    });
  };

  $('a').live('click', function(event) {

    var host = location.protocol + '//' + location.hostname;
    var hashLink = this.href.substr('#') >= 0;
    var externalHost = this.href.indexOf(host) != 0;
    var alternateClick = event.which > 1 || event.metaKey;
    var noPjax = $(this).hasClass('no-pjax');

    // First handle a bunch of conditions which shouldn't use pjax.
    if (hashLink) {
      // Link refers to a hash within the page.
      return false;
    } else if (externalHost || alternateClick || noPjax) {
      // Link is an external host, an alternate click such as
      // alt or meta key pressed, or is explicitly disabled with
      // no-pjax CSS class.
      return true;
    }

    pjax(this.href, true);
    return false;

  })

  $(window).bind('popstate', function(event) {
    if (initial) {
      initial = false;
      return;
    }
    if (event.state) {
      pjax(event.state.url || location.href);
    } else {
      location = location.href;
    }
  });

  $.event.props.push('state');

};

if (window.history && window.history.pushState &&
    !navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/)) {
  $(pjaxSetup);
}

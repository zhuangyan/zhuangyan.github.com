
// Google analytics setup.

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-52596-4']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// bars() is the callback function the GitHub API script will use
// when it returns data about my repos. Since I have multiple pages
// of repos, it's called multiple times, and each time it will add
// repo data to window.repos - this way we eventually always deal with
// all repos, by always referencing window.repos
//
// bars() then looks at the list of projects rendered in the homepage,
// and matches their titles up to the window.repos data, adding bars
// with widths based on number of watchers/forks, as well as adding
// the tooltips to the bars with watchers/forks text.

// The tooltip code just references the .bar CSS class which is also
// used by the article bars, which already have tooltip text (article
// wordcount) in their title attributes.

var bars = function(repos) {

  window.repos = window.repos || {};

  var normalize = function(s) {
    return s ? s.toLowerCase().replace(/-| /g, '') : '';
  };

  var pluralize = function(i) {
    return i != 1 ? 's' : '';
  };

  var getRepo = function(name) {
    if (name == 'django-pg-fuzzycount') {
      name = 'django-postgres-fuzzycount';
    }
    var abbr = $.map(name.split(' '), function(s, i) {
                 return s.substr(0, 1).toLowerCase();
               }).join('');
    return window.repos[normalize(name)] || window.repos[abbr];
  };

  if (repos) {
    $.each(repos.data, function(i, repo) {
      window.repos[normalize(repo.name)] = repo;
    });
  }

  $('.projects li').each(function(i, project) {
    project = $(project);
    if (project.find('.bar').length > 0) {
      return;
    }
    var repo = getRepo(project.find('a').text());
    if (repo) {
      var css = {width: (((repo.watchers + repo.forks) / 25) + 10) + 'px'};
      var title = repo.watchers + ' watcher' + pluralize(repo.watchers)
                  + ', ' + repo.forks + ' fork' + pluralize(repo.forks);
      var bar = $('<a>').addClass('bar').css(css).attr('title', title);
      project.append(bar);
    }
  });

  $('.bar').click(function() {
    return false;
  }).tooltip({placement: 'right', animate: false});

};

// pageLoad() handles any code that should be run each time a page is
// loaded - it's in a separate function so we can call it from within
// the pjax script, each time a page is loaded via pjax.
var pageLoad = function(initial) {
  // Jekyll doesn't deal with invalid language names for CSS classes
  // in pygments, see: https://github.com/mojombo/jekyll/pull/994
  $('code[class=\'html+django\']').attr('class', 'html-django');
  // Page loaded via pjax - track in Google analytics, and ensure
  // bars get loaded for the homepage.
  if (!initial) {
    _gaq.push(['_trackPageview']);
  }
  // Ensure coderwall badges and GitHub data get loaded on the homepage.
  if ($('#coderwall').length == 1) {
    coderwall();
    if (!window.repos) {
      var src = 'https://api.github.com/users/stephenmcd/repos?callback=bars';
      $('head').append($('<script>').attr('src', src));
      $('head').append($('<script>').attr('src', src + "&page=2"));
    } else {
      bars();
    }
  }
};

// Load GitHub repos via their API, and run initial pageLoad().
$(function() {
  pageLoad(true);
});

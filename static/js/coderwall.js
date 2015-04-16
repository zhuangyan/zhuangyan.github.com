var coderwall = function() {

    var url = 'http://www.coderwall.com/stephenmcd';

    var show = function() {
        $.each(window.badges, function(i, item) {
            $("#coderwall").append($('<a href="' + url +
                '" title="' + item.name + ': ' + item.description +
                '"><img src="' + item.badge + '"></a>'));
        });
        $("#coderwall").show();
        $("#coderwall a").tooltip({placement: 'top', offset:50, animate: false});
    };

    if (window.badges) {
        show();
    } else {
        $.getJSON(url + '.json?callback=?', function(data) {
            window.badges = data.data.badges;
            show();
        });
    }

};

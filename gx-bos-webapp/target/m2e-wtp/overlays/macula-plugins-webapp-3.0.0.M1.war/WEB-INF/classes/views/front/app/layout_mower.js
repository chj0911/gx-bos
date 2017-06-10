var Layout = (function($) {

    // private functions & variables
    var onFavoriteClick = function(href) {
        alert("want to favorite href:" + href);
    };

    // public functions
    return {
        //main function
        init: function() {
            this.initMainMenu();
            this.activeMenu();
        },
        initMainMenu: function() {
            $("#main-menu").on("clickMenu.mu.mainMenu", function(event) {
                event.preventDefault();
                var purl = 'index.html?' + 'title=' + event.instance.name + '&_=' + (new Date()).valueOf();
                window.location = purl;
            });
        },
        
        activeMenu : function() {
        	var mainMenuCode = $("#currentMenu").attr("mainMenuCode");
        	if (mainMenuCode) {
        		$("#menuid").children().each(function() {
        			var $li = $(this);
        			var menuCode = $li.attr("data-menuCode");
        			if (mainMenuCode == menuCode) {
        				$li.addClass("active");
        			} else {
        				$li.removeClass("active");
        			}
        		});
        	}
        }
    };
}(jQuery));

$(document).ready(function() {
    Layout.init();
});
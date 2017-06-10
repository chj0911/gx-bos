var Layout = (function($, utils, window, document, undefined) {

    var resBreakpointMd = utils.getResponsiveBreakpoint('md');

    // private functions & variables
    var resizeHeaderMenu = function() {
        var $menu = $('.header-menu > .navbar-nav');
        var $menuItems;

        if (utils.getViewPort().width < resBreakpointMd) {
            $menuItems = $menu.children('li:not(.dropdown)');
            $menu.children('li.dropdown').find('ul.dropdown-menu').prepend($menuItems.attr('data-basic', true));
        } else {
            var $li = $menu.children('li.dropdown').find('ul.dropdown-menu > li');
            $menuItems = $li.filter(function() {
                return $(this).attr("data-basic") === 'true';
            });

            $menu.prepend($menuItems.removeAttr('data-basic'));
        }

        var $dropdownMenu = $menu.children('li.dropdown'),
            $active = $dropdownMenu.find('li.active'),
            $caret = $dropdownMenu.find('span.caret');

        $dropdownMenu.removeClass('active');

        if (!$active.length) {
            $dropdownMenu.find('.dropdown-toggle').html($dropdownMenu.find('li:first a').text()).append(' ').append($caret);
        } else {
            $dropdownMenu.addClass('active');
            $dropdownMenu.find('.dropdown-toggle').html($active.children('a').text()).append(' ').append($caret);
        }
    };

    
    var initBreadCrumb = function() {
        $(".sidebar-menu").on('complete.mu.sidebarMenu', function(event) {
            var defaultVal = $(document)[0].title;
            $(".breadcrumb").find('li.active').empty().append('<i class="fa fa-home home"></i><span>' + decodeURIComponent(defaultVal) + '</span>');
        });
    };
    
    var initMainMenu = function() {

        var rcode = rcodeParam || Cookie.readCookie('rcode'),
            mcode = mcodeParam || Cookie.readCookie('mcode'),
            selectedMenu = rcode ? $('.header-menu li:not(.dropdown) a[mcode="' + rcode + '"]') : $('.header-menu li:not(.dropdown):first a');

        if (!rcode) {
            rcode = selectedMenu.attr('mcode');
        }

        $(".sidebar-menu").sidebarMenu({
            'url': menuUrl,
            "populate": false
        }).sidebarMenu('populate', rcode, mcode);

        selectedMenu.closest('li').addClass('active').siblings().removeClass('active');

        //change text if click dropdown-menu's a 
        var $parent = selectedMenu.closest('ul.dropdown-menu');
        if ($parent.length) {
            $parent.parent().addClass('active').siblings().removeClass('active');

            var $caret = $parent.parent().find('span.caret');
            $parent.parent().find('.dropdown-toggle').html(selectedMenu.text()).append(' ').append($caret);
        } else {
            selectedMenu.closest('li').siblings('.dropdown').find('li').removeClass('active');
        }

        //handle menu click event and redirect url
        $('.header-menu').on('click', 'li:not(.dropdown) > a', function(event) {
            event.preventDefault();

            var $this = $(this),
                rcode = $this.attr('mcode'),
                purl = $this.attr('href');

            Cookie.createCookie('rcode', rcode, 1);
            Cookie.eraseCookie('mcode');
            
            window.location = purl;
        });
    };
    
    var initiateSideMenu = function() {

        //Sidebar Toggler
        $(".sidebar-toggler").on('click', function() {
            $("#sidebar").toggleClass("hide");
            $("body").toggleClass("mu-sidebar-closed");
            $(".sidebar-toggler").toggleClass("active");
            return false;
        });
        //End Sidebar Toggler

        //Sidebar Collapse
        var b = $("#sidebar").hasClass("menu-compact");
        $("#sidebar-collapse").on('click', function() {
            if (!$('#sidebar').is(':visible')) {
                $("body").toggleClass("mu-sidebar-closed");
                $("#sidebar").toggleClass("hide");
            }

            $("#sidebar").toggleClass("menu-compact");
            $('body').toggleClass("mu-sidebar-compact");
            $(".sidebar-collapse").toggleClass("active");
            b = $("#sidebar").hasClass("menu-compact");

            if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
                $(".sidebar-menu").slimScroll({
                    destroy: true
                });
                $(".sidebar-menu").attr('style', '');
            }
            if (b) {
                $(".open > .submenu")
                    .removeClass("open");
            } else {
                if ($('.mu-sidebar').hasClass('sidebar-fixed')) {
                    var position = (Cookie.readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
                    $('.sidebar-menu').slimscroll({
                        height: 'auto',
                        position: position,
                        size: '3px',
                        color: themeprimary
                    });
                }
            }
            //Slim Scroll Handle
        });
        //End Sidebar Collapse

        $(".sidebar-menu").on("clickMenu.mu.sidebarMenu", function(event) {
            event.preventDefault();

            //scripts as below traffic default implement in sidebarMenu plugin
            var title = event.instance.name,
                rcode = event.rcode,
                mcode = event.mcode;

            var purl = base + (event.href.indexOf("/") == 0 ? event.href : "/" + event.href);

            Cookie.createCookie('rcode', rcode, 1);
            Cookie.createCookie('mcode', mcode, 1);
            
//            if(rcode && purl) {
//        		purl = purl + (purl.indexOf("?") > 0 ?  ("&rcode=" + rcode): ("?rcode=" + rcode))
//        	}
//            
//            if(mcode && purl) {
//        		purl = purl + (purl.indexOf("?") > 0 ?  ("&mcode=" + mcode): ("?mcode=" + mcode))
//        	}
            
            var openMode = $(event.target).attr('data-mode') || 'normal';
            
            switch(openMode){
	            case '_blank':
	            case 'blank':
	            	window.open(purl,title || '');
	            break;
	            case 'normal':
	            default:
	            window.location.href = purl;
            }
            window.location = purl;
        });
    };
    
    var loading = function() {
        /*Loading*/
        $(window).load(function() {
        	setTimeout(function() {
        		$('.loading-container').addClass('loading-inactive');
            }, 500);
        });
    };

    // public functions
    return {
        //main function
        init: function() {
        	loading();
            initMainMenu();
            initBreadCrumb();
            initiateSideMenu();

            utils.addResizeHandler(resizeHeaderMenu);
            resizeHeaderMenu();

            //Handle RTL SUpport for Changer CheckBox
            $("#skin-changer li a").click(function() {
                Cookie.createCookie("current-skin-admin", $(this).attr('rel'), 10);
                window.location.reload();
            });
        }
    };
}(jQuery, Utils, window, document));


$(document).ready(function() {
    Layout.init();
});
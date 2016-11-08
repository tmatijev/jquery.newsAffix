;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName  = 'newsAffix';
    var defaults    = {
        headerWrapper: "#targeted-wrapper",
        headerClass: ".content__title",
        sidebar: ".js-news-affix-items",
        newsAffixSel: ".js-news-affix",
        setAffixClasses: {
            cssClass: '.news-affix__bar',
            cssRule: 'width'
        },
        onClickElements: '.js-affix-click',
        scrollAnimationSpeed: 750
    };

    function Plugin( element, options ) {
        this.element        = element;
        this.options        = $.extend( {}, defaults, options) ;
        this._defaults      = defaults;
        this._name          = pluginName;
        this.headers        = {};
        this._sidebarIndex  = 0;
        this._currentPos    = 0;
        this._newsAffixPos  = 0;
        this.isAffixActive  = false;
        this.$affix         = $(this.options.newsAffixSel);
        this._activeChapter = 0;
        this._$sidebar      = $(this.options.sidebar);
        this._affixStyle    = '';

        this.init();
    }

    Plugin.prototype.init = function () {
        this.setNewsAffixPosition();
        this.setHeaderPosition();
        this.setActiveHeader();
        this.setScrollHandler();
        this.toggleNewsAffix();
        this.onResizeEvent();
        this.checkResponsiveState();
        this.onClickScrollEvent();
    };

    Plugin.prototype.setScrollHandler = function () {
        var scrollTimeout;
        var that = this;

        $(window).scroll(function () {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
                scrollTimeout = null;
            }

            scrollTimeout = setTimeout(that.scrollHandler(), 20);
        });
    };

    Plugin.prototype.helperDebounce = function (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this;
            var args    = arguments;
            var later   = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            var callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);

            if (callNow) {
                func.apply(context, args);
            }
        };
    };

    Plugin.prototype.onResizeEvent = function () {
        var that = this;

        var myEfficientFn = this.helperDebounce(function() {
            that.checkResponsiveState(that.getCurrentResolution());
        }, 250);

        window.addEventListener('resize', myEfficientFn);
    };

    Plugin.prototype.checkResponsiveState = function (resolution) {
        resolution = resolution || this.getCurrentResolution();

        this.setPercentageOfChapter();
    };

    Plugin.prototype.scrollHandler = function () {
        this.toggleNewsAffix();
        this.setActiveHeader();
        this.setPercentageOfChapter();
    };

    Plugin.prototype.toggleNewsAffix = function () {
        if( this.getScrollTopOnLoad() > this.headers[1].start ) {
            this.$affix.addClass('active');
        } else {
            this.$affix.removeClass('active');
        }
    };

    Plugin.prototype.setHeaderPosition = function () {
        var $wrapper = $(this.options.headerWrapper);
        var naItems = $wrapper.find('[data-na-header]');

        for( var i = 0; i < naItems.length; i++ ) {
            this.headers[i + 1] = {
                start: $(naItems[i]).offset().top
            };

            if( i + 1 === naItems.length ) {
                var chapterHeight = $(naItems[i]).parent().height();
                var chapterEnd = parseInt($(window).height() - chapterHeight, 10);
                var final = chapterHeight + $(naItems[i]).offset().top;

                this.headers[i + 1].end = final;
            }

            if( i + 1 > 1 ) {
                this.headers[i]['end'] = $(naItems[i]).offset().top - 1;
            }
        }
    };

    Plugin.prototype.setActiveHeader = function () {
        var length = Object.keys(this.headers).length;
        var currentPosition = this.getScrollTopOnLoad();

        for( var key in this.headers ) {
            if( this.headers.hasOwnProperty(key) ) {
                var isCurrentHeader = this.getCurrentPosition({
                    start: this.headers[key].start,
                    end: this.headers[key].end,
                    current: currentPosition,
                    index: Number(key)
                });

                if( isCurrentHeader ) {
                    this.setSidebarActiveClass(Number(key));
                    break;
                }
            }
        }
    };

    Plugin.prototype.setPercentageOfChapter = function (param) {

        if( !this._sidebarIndex ) {
            return false;
        }

        this.setHeaderPosition();
        this.toggleNewsAffix();
        this.setActiveHeader();

        var step        = parseInt(this.headers[this._sidebarIndex].end - this.headers[this._sidebarIndex].start, 10);
        var current     = parseInt(this.getScrollTopOnLoad() - this.headers[this._sidebarIndex].start, 10);
        var percentage  = parseFloat(current / step * 100).toFixed(2) + '%';
        var affixClass  = this.options.setAffixClasses.cssClass;
        var affixRule   = this.options.setAffixClasses.cssRule;

        this._$sidebar
            .find('*[data-na-side="'+Number(this._sidebarIndex)+'"]')
            .find(affixClass)
                .css(affixRule, percentage);
    };

    Plugin.prototype.setSidebarActiveClass = function (index) {
        if( this._sidebarIndex !== index ) {
            this._sidebarIndex  = index;

            this._$sidebar.find('[data-na-side]').removeClass('active');
            this._$sidebar.find('*[data-na-side="' + Number(index) + '"]').addClass('active');

            this.setSidebarCompletedChapters(this._sidebarIndex);
        }
    };

    Plugin.prototype.setSidebarCompletedChapters = function (currentIndex) {
        this._$sidebar.find('.news-affix__item').removeClass('completed');

        for( var i = 0; i < currentIndex - 1; i++ ) {
            this._$sidebar.find('.news-affix__item').eq(i).addClass('completed');
        }
    };

    Plugin.prototype.onClickScrollEvent = function () {
        var that = this;

        $(this.options.newsAffixSel).on('click', this.options.onClickElements, function (e) {
            e.preventDefault();

            var clickedIndex    = $(this).parent().data('na-side');
            var $header         = $('*[data-na-header="' + clickedIndex + '"]');

            $('html, body').animate({
                scrollTop: $header.offset().top + 1
            }, that.options.scrollAnimationSpeed);
        });
    };

    Plugin.prototype.setNewsAffixPosition = function () {
        this._newsAffixPos = $(this.options.newsAffixSel).offset().top;
    };

    Plugin.prototype.getCurrentResolution = function () {
        return window.innerWidth || document.documentElement.clientWidth;
    };

    Plugin.prototype.getCurrentPosition = function (param) {
        return param.current > param.start && param.current <= param.end;
    };

    Plugin.prototype.getScrollTopOnLoad = function () {
        return $('body').scrollTop();
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
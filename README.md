# jquery.newsAffix

Demo is located [here](http://tmatijev.github.io/jquery.newsAffix/)

## Init example (default values) ##
```javascript
$(function () {
    $('body').newsAffix({
        headerWrapper: "#targeted-wrapper",
        headerClass: ".content__title",
        sidebar: ".js-news-affix-items",
        newsAffixSel: ".js-news-affix",
        setAffixClasses: {
            lower: {
                cssClass: '.news-affix__bar-inverse',
                cssRule: 'height'
            },
            higher: {
                cssClass: '.news-affix__bar',
                cssRule: 'width'
            }
        },
        breakPoint: 1250
    });
});
```
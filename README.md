# jquery.newsAffix

.Demo is located [here](http://tmatijev.github.io/jquery.newsAffix/)

News affix is handy plugin which is very useful on blog post with a lot of chapters. Just define chapter headers and insert affix `HTML` on your site and you are ready to go.

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
        onClickElements: '.js-affix-click',
        scrollAnimationSpeed: 750,
        breakPoint: 1250
    });
});
```
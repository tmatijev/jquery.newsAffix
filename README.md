# jquery.newsAffix

.Demo is located [here](http://tmatijev.github.io/jquery.newsAffix/)

News affix is handy plugin which is very useful on blog post with a lot of chapters. Just define chapter headers and insert affix `HTML` on your site and you are ready to go.

![alt tag](https://raw.githubusercontent.com/tmatijev/jquery.newsAffix/master/video.gif)

## Init example (default values) ##
```javascript
$(function () {
    $('body').newsAffix({
        headerWrapper: "#targeted-wrapper",
        headerClass: ".content__title",
        sidebar: ".js-news-affix-items",
        newsAffixSel: ".js-news-affix",
        setAffixClasses: {
            cssClass: '.news-affix__bar',
            cssRule: 'width'
        },
        onClickElements: '.js-affix-click',
        scrollAnimationSpeed: 750,
        breakPoint: 1250
    });
});
```

## Options ##
* `headerWrapper` - main header wrapper which contains chapters. Chapters should be direct childs of the main targeted wrapper.
* `headerClass` - header title of each chapter
* `sidebar` - affix sidebar class name
* `newsAffixSel` - main news affix selector
* `setAffixClasses / cssClass` - CSS class for news affix currently active item. `cssRule` is used should affix item calculate `width` or `height` on the current element. Previous version had `width` & `height`, new version has only `width`.
* `onClickElement` - element which will trigger on scroll event
* `scrollAnimationSpeed` - speed of animation

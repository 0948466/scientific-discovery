// fix share js
$( function () {
    var share = $('.ya-share2'),
        link = $(".ya-share2__item_service_vkontakte .ya-share2__link")
    if (!share.length) {
        return
    }

    link.attr('href', link.attr('href') + '&comment=' + share.data( "comment"))
});
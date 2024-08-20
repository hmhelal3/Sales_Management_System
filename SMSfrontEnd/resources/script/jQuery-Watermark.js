/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$.fn.watermark = function (params) {
    //default values
    var settings = $.extend({
        'waterCss': { color: 'Gray' },
        'activeCss':  { color: 'Black' }
    }, params);

    //loop
    $(this).each(function () {
        if ($(this).val().length == 0) {
            $(this).css(settings.waterCss);
            $(this).val($(this).attr("data-water"));
        }
        $(this).unbind("focus").focus(function () {
            if (($(this).val() == $(this).attr("data-water")) || (jQuery.trim($(this).val()).length == 0)) {
                $(this).val("");
                $(this).css(settings.activeCss);
            }
        }).blur(function () {
            if (jQuery.trim($(this).val()).length == 0) {
                $(this).val($(this).attr("data-water"));
                $(this).css(settings.waterCss);
            }
        });
    });
}


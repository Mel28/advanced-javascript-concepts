(function(){
var tabPanel = function($li){
    var selector = $li.find("a").attr("href");
    return $(selector);
};
$.fn.tabs = function(){
    $.each(this, function(i, ul){
        var $ul = $([ul]);
        $.each( $ul.children(), function(i, li) {
            var $li = $([li]);
            if(i == 0) {
                
            } else {
                var $div = tabPanel($li);
                $div.hide();
            }
        });
    });
};

})();

$("#breeds").tabs()
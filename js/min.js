  $(window).scroll(function(){
    $(".main").css("opacity", 1 - $(window).scrollTop()/540);
    console.log($(window).scrollTop());
  });

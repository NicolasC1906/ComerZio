// header-sticky
$(window).scroll(function(){
	// checks if window is scrolled more than 500px, adds/removes solid class
    if($(this).scrollTop() > 75) {
    	$('#navbar').addClass('header-sticky');
    } else {
    	$('#navbar').removeClass('header-sticky');
    }
});

$(document).ready(function(){
	"use strict";
	/// Homeslider //
	$("#home-slider").owlCarousel({
		nav:true,
		paginationSpeed : 400,
		items : 1,
		navText : ['<i class="fas fa-long-arrow-alt-left"></i>','<i class="fas fa-long-arrow-alt-right"></i>'],
	});

	$(".tilestyle-2 img").click(function() {
    	var imgsrc = $(this).attr('src');
    	$('.photo').css('background-image', 'url(' + imgsrc + ')');
    });
    resizefullscreen();

    //product details slider
	$("#pro-slider").owlCarousel({
	    center: true,
	    items:1,
	    loop:true,
	    autoplay:true,
		autoplayTimeout:2000,
		autoplayHoverPause:true
	});

    //product details slider
    $("#recent-blog").owlCarousel({
        center: true,
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:2000,
        autoplaySpeed:2000,
        autoplayHoverPause:true,
        margin:10
    });


    $("#related-blog").owlCarousel({
        nav: true,
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:4000,
        autoplaySpeed:3000,
        autoplayHoverPause:true,
        navText : ['<i class="fas fa-long-arrow-alt-left"></i>','<i class="fas fa-long-arrow-alt-right"></i>']
    });

	//accordion with toggle icons
	var win_width = $( window ).width();
	if(win_width <= 991){

		$('.dropdown-toggle').on('click',function (e) {
			if($(this).hasClass('active-mobile')){
				$(this).collapse('hide');
				$(this).next('.dropdown-menu').removeClass('show');
				$(this).removeClass('active');
				$(this).removeClass('show');
				$(this).removeClass('active-mobile');

			}else{
				$(this).addClass('active-mobile');
				$(this).addClass('active');
				$(this).next('.dropdown-menu').addClass('show');
			}

	    });
	}

	if(win_width <= 1024){
		$('.show-cart').on('click', function (e) {
	    	if($('.cartcontainer-style1').hasClass('active')){
	    		$('.cartcontainer-style1').removeClass('active');
	    	}else{
	    		$('.cartcontainer-style1').addClass('active');
	    	}
		});
	}

	//accordion with toggle icons
	function toggleIcon(e){
        $(e.target)
            .prev('.panel-title')
            .find(".fas")
            .toggleClass('fa-plus-circle fa-minus-circle');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);


    if($('#instaFeed-style1').length != 0){

    var instaFeedStyle1 = new Instafeed({
        target: 'instaFeed-style1',
        "edge_liked_by": {
          "count": 821544
        },
        get: 'user',
        userId: 12349984504,
        limit: 6,
        accessToken: '12349984504.1677ed0.fea9b78a358046f3ace9907eb39ef749',
        resolution: 'standard_resolution',
        error: {
            template:'<div class="col-12"><span class=text-center>No Images Found</span></div>'
        },
        template: '<div class="col-xl-4 col-lg-4 col-md-4 col-6 padding-left-0px padding-right-0px instafeed-style1"><a class="insta-link" href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image img-fluid w-100 h-100"/><div class="insta-counts"><span class="margin-right-20px"><i class="far fa-heart"></i><span class="count-number">{{likes}}</span></span><span><i class="far fa-comment"></i><span class="count-number">{{comments}}</span></span></div></a></div>'
    });
    instaFeedStyle1.run();
  }

   /// Homeslider //
    var swiper = new Swiper('#home-slider2', {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.next',
        prevEl: '.prev',
      },
    });

});


/*==============================================================
Masonary Grid For Product
==============================================================*/

var $grid = $('.grid').masonry({
	itemSelector: '.grid-item',
	columnWidth: '.grid-sizer',
	percentPosition: true
});

// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
	$grid.masonry('layout');
});

// popup
$(window).on('load',function(){
    $('#popup-style1').modal('show');
});

function resizefullscreen() {
    var minheight = $(window).height();
    $(".fullscreen").css('min-height', minheight);
}

$(window).resize(function () {
    resizefullscreen();
});

/*==============================================================
countdown timer
==============================================================*/

$('#counter-event').countdown($('#counter-event').attr("data-enddate")).on('update.countdown', function (event) {
	var $this = $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'))
});

/*==============================================================
	Zoom image
==============================================================*/

// tile mouse actions
$('.tile').on('mouseover', function(){
	$(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
})
$('.tile').on('mouseout', function(){
	$(this).children('.photo').css({'transform': 'scale(1)'});
})
$('.tile').on('mousemove', function(e){
	$(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
})
// tiles set up
$('.tile').each(function(){
	$(this).append('<div class="photo border-radius-5"></div>')
	$(this).children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
});

/*==============================================================
Quantity counter
==============================================================*/

$('.qty-input i').on('click',function() {
	if ($(this).hasClass('less')) {
		var	val = parseInt($(this).next().val());
		val = val - 1;
		var ele = $(this).next();
	} else if ($(this).hasClass('more')) {
		var	val = parseInt($(this).prev().val());
		val = val + 1;
		var ele = $(this).prev();
	}
	if (val < 1) {
		val = 1;
	}
	ele.val(val);
});

/*==============================================================
	Range slider
==============================================================*/
var slider = document.getElementById("myRange");
var output = document.getElementById("value");
// Update the current slider value (each time you drag the slider handle)
if(output != null){
	output.innerHTML = slider.value; // Display the default slider value
	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	  output.innerHTML = this.value;
	}
}
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })


/*==============================================================
	Subscribe Newsletters
==============================================================*/

$('#subscribe-submit').on('click', function (event) {
	event.preventDefault();
    var email_process = '';
    if ($('#email-address').is('[data-field="required"]')) {
        var email_val = $('#email-address').val();
        if (email_val != '') {
            email_val = email_val;
            alert(email_val);
            email_process = true;
        } else {
            $('#email-address').addClass('msg-error');
            email_process = false;
        }
    }

    if(email_process)
    {
        $.post("email_apis/suscribe-contact.php", {
            data: { email:email_val},
            type: "POST",
        }, function (data) {
            if(data)
            {
                if(data.type == "msg-success")
                {
                    $('#success').remove();
                    $('#error').remove();
                   var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                }else if (data.type == "msg-error") {
                    $('#success').remove();
                    $('#error').remove();
                    var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                }else{
                    var output = '';
                }
            }

            if(output != '')
            {
                $('form').before(output);
            }
            setTimeout(function(){
                $('#success').fadeOut();
                $('#success').remove();
                $('#error').fadeOut();
                $('#error').remove();
                $('#subscribe-submit').submit();
             },5000);

        }, 'json');
    }


    $('#email-address').keypress(function () {
        $(this).removeClass('msg-error');
    });

    if ($('#email-address').is(":focus")) {
        $(this).removeClass('msg-error');
    }
});


/*==============================================================
	Newsletters Subscribe
==============================================================*/

$('#newsletters-submit').on('click', function (event) {
	event.preventDefault();
    var email_process = '';
    if ($('#email').is('[data-field="required"]')) {
        var email_val = $('#email').val();
        if (email_val != '') {
            email_val = email_val;
            email_process = true;
        } else {
            $('#email').addClass('msg-error');
            email_process = false;
        }
    }

    if(email_process)
    {
        $.post("email_apis/suscribe-contact.php", {
            data: { email:email_val},
            type: "POST",
        }, function (data) {
            if(data)
            {
                if(data.type == "msg-success")
                {
                    $('#success').remove();
                    $('#error').remove();
                   var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                }else if (data.type == "msg-error") {
                    $('#success').remove();
                    $('#error').remove();
                    var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                }else{
                    var output = '';
                }
            }

            if(output != '')
            {
                $('form').before(output);
            }
            setTimeout(function(){
                $('#success').fadeOut();
                $('#success').remove();
                $('#error').fadeOut();
                $('#error').remove();
                $('#subscribe-submit').submit();
             },5000);

        }, 'json');
    }

    $('#email').keypress(function () {
        $(this).removeClass('msg-error');
    });

    if ($('#email').is(":focus")) {
        $(this).removeClass('msg-error');
    }
});




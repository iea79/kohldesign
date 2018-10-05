/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device


$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }


	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        height: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

    $('.sliderFor').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      infinite: false,
      asNavFor: '.sliderNav'
    });
    $('.sliderFor2').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      infinite: false,
      asNavFor: '.sliderNav',
    });
    $('.sliderFor3').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      infinite: false,
      asNavFor: '.sliderNav',
    });
    var slider = $('.sliderNav').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.sliderFor,.sliderFor2,.sliderFor3',
      dots: false,
      arrows: false,
      centerMode: true,
      infinite: false,
      focusOnSelect: true,
      vertical: true,
    });
    $('.sliderButton_prev').click(function() {
        slider.slick('slickPrev');
    });
    $('.sliderButton_next').click(function() {
        slider.slick('slickNext');
    });

    $('.form__radio input').change(function() {
        var inputDate = $('#input_date')
        var checked = $('#form_radio_1').prop('checked')
        // console.log(checked)
        if (checked) {
            inputDate.fadeOut(300);
            inputDate.find('input').val('');
        }
        else {
            inputDate.fadeIn(300);
        }
    });

    var houseTab = $('#modal_tabs li')
    var houseGroup = $('.modal__text');
    houseTab.click(function() {
        var index = $(this).index();
        houseTab.removeClass('active');
        $(this).addClass('active');
        houseGroup.addClass('hide');
        houseGroup.eq(index).removeClass('hide');
    });

    // Tooltips in Meeting block
    // $('.meeting__point_js').hover(function() {
    //   var $this = $(this),
    //       tooltipId = $this.attr('href');

    //   $(tooltipId).fadeIn();      
    // }, function() {
    //   $('.meeting__tooltip_js').fadeOut();
    // }, 200);

    $('.meeting__point_js').on('click', function(e) {
      e.preventDefault();
    });

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });

    // Inputmask.js
    $('[name=tel]').inputmask("+9(999)999 99 99",{ showMaskOnHover: false });
    $('[name=timeToCall]').inputmask("99:99",{ showMaskOnHover: false });

    formSubmit();
    
   	// gridMatch();

    checkOnResize();

    $('.modal').on('hidden.bs.modal', function() {
        if ($('.modal.in').length > 0) {
            $('body').addClass('modal-open');
        }
    });

});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize();

});

function checkOnResize() {
   	// gridMatch();
    fontResize();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

function fontResize() {
    var windowWidth = $(window).width();
    	var fontSize = windowWidth/21.55;
    // if (windowWidth >= 768) {
    //     var fontSize = windowWidth/19.05;
    // } else if (windowWidth < 768) {
    // 	var fontSize = windowWidth/4.8;
    // }
	$('body').css('fontSize', fontSize + '%');
}

// Видео youtube для страницы
$(function () {
    if ($(".js_youtube")) {
        $(".js_youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
            $('.video__wrapper').css({
                'background-image': 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)',
                'background-size': '100%'
            });

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<div class="video__play"></div>'));

        });

        $('.video__play, .video__prev').on('click', function () {
            // создаем iframe со включенной опцией autoplay
            var videoId = $(this).closest('.js_youtube').attr('id');
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
                'width': $('.video__prev').width(),
                'height': $('.video__prev').innerHeight()
            })

            // Убираем "Посмотрите видео" при воспроизведении
            $('.videoOver').hide();

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).closest('.video__wrapper').append(iframe);

        });
    }

});


// Деление чисел на разряды Например из строки 10000 получаем 10 000
// Использование: thousandSeparator(1000) или используем переменную.
// function thousandSeparator(str) {
//     var parts = (str + '').split('.'),
//         main = parts[0],
//         len = main.length,
//         output = '',
//         i = len - 1;
    
//     while(i >= 0) {
//         output = main.charAt(i) + output;
//         if ((len - i) % 3 === 0 && i > 0) {
//             output = ' ' + output;
//         }
//         --i;
//     }

//     if (parts.length > 1) {
//         output += '.' + parts[1];
//     }
//     return output;
// };


// Хак для яндекс карт втавленных через iframe
// Страуктура:
//<div class="map__wrap" id="map-wrap">
//  <iframe style="pointer-events: none;" src="https://yandex.ru/map-widget/v1/-/CBqXzGXSOB" width="1083" height="707" frameborder="0" allowfullscreen="true"></iframe>
//</div>
// Обязательное свойство в style которое и переключет скрипт
// document.addEventListener('click', function(e) {
//     var map = document.querySelector('#map-wrap iframe')
//     if(e.target.id === 'map-wrap') {
//         map.style.pointerEvents = 'all'
//     } else {
//         map.style.pointerEvents = 'none'
//     }
// })

// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $("[type=submit]").on('click', function (e){ 
        e.preventDefault();
        var form = $(this).closest('.form');
        var url = form.attr('action');
        var form_data = form.serialize();
        var field = form.find('[required]');
        // console.log(form_data);

        empty = 0;

        field.each(function() {
            if ($(this).val() == "") {
                $(this).addClass('invalid');
                // return false;
                empty++;
            } else {
                $(this).removeClass('invalid');
                $(this).addClass('valid');
            }  
        });

        // console.log(empty);

        if (empty > 0) {
            return false;
        } else {        
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function (response) {
                    // $('#success').modal('show');
                    // console.log('success');
                    // console.log(response);
                    // console.log(data);
                    document.location.href = "success.html";
                },
                error: function (response) {
                    // $('#success').modal('show');
                    // console.log('error');
                    // console.log(response);
                }
            });
        }

    });

    $('[required]').on('blur', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });

    $('.form__privacy input').on('change', function(event) {
        event.preventDefault();
        var btn = $(this).closest('.form').find('.btn');
        if ($(this).prop('checked')) {
            btn.removeAttr('disabled');
            // console.log('checked');
        } else {
            btn.attr('disabled', true);
        }
    });
}



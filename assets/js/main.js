// TYPEWRITER EFFECT
const TypeWriter = function(txtElement, words, wait = 1000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}
// Type Method
TypeWriter.prototype.type = function() {
  // current index of text
  const current = this.wordIndex % this.words.length;
  // get full text of current text
  const fullTxt = this.words[current];

  // Check if deleting
  if(this.isDeleting) {
      //remove char
      this.txt = fullTxt.substring(0, this.txt.length -1);
  }
  else {
      //Add char
      this.txt = fullTxt.substring(0, this.txt.length +1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; 

  // Initial Type Speed
  let typeSpeed = 100;

  /* DELETS AND RETYPES IDK IF I WANNA USE YET---------------------------------------------

  if(this.isDeleting) {
      typeSpeed /= 2;
  }

  // if phrase is complete
  if(!this.isDeleting && this.txt === fullTxt) {
      // makes pause before deleting/at the end of each phrase 
      typeSpeed = this.wait;
      // set deleting to true since phrase is done typing
      this.isDeleting = true;
  }
  else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move on to next word/phrase
      this.wordIndex++;
      // pause before type again
      typeSpeed = 1000;
  }
*/
  setTimeout(()=> this.type(), 100)
}

// Init on DOM load 
document.addEventListener('DOMContentLoaded', init);

// Init app
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init Typewriter
  new TypeWriter(txtElement, words, wait);
}



(function($) {
  "use strict";
  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });
  var siteMenuClone = function() {
    $('.js-clone-nav').each(function() {
      var $this = $(this);
      $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
    });
    setTimeout(function() {
      var counter = 0;
      $('.site-mobile-menu .has-children').each(function() {
        var $this = $(this);
        $this.prepend('<span class="arrow-collapse collapsed">');
        $this.find('.arrow-collapse').attr({
          'data-toggle': 'collapse',
          'data-target': '#collapseItem' + counter,
        });
        $this.find('> ul').attr({
          'class': 'collapse',
          'id': 'collapseItem' + counter,
        });
        counter++;
      });
    }, 1000);
    $('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ($this.closest('li').find('.collapse').hasClass('show')) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();
    });
    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();
      if (w > 768) {
        if ($('body').hasClass('offcanvas-menu')) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    })
    $('body').on('click', '.js-menu-toggle', function(e) {
      var $this = $(this);
      e.preventDefault();
      if ($('body').hasClass('offcanvas-menu')) {
        $('body').removeClass('offcanvas-menu');
        $('body').find('.js-menu-toggle').removeClass('active');
      } else {
        $('body').addClass('offcanvas-menu');
        $('body').find('.js-menu-toggle').addClass('active');
      }
    })
    // click outisde offcanvas
    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas-menu')) {
          $('body').removeClass('offcanvas-menu');
          $('body').find('.js-menu-toggle').removeClass('active');
        }
      }
    });
  };
  siteMenuClone();
  var siteScroll = function() {
    $(window).scroll(function() {
      var st = $(this).scrollTop();
      if (st > 100) {
        $('.js-sticky-header').addClass('shrink');
      } else {
        $('.js-sticky-header').removeClass('shrink');
      }
    })
  };
  siteScroll();
  var siteSticky = function() {
    $(".js-sticky-header").sticky({
      topSpacing: 0
    });
  };
  siteSticky();
  var siteOwlCarousel = function() {
    $('.testimonial-carousel').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      smartSpeed: 1000,
    });
  };
  siteOwlCarousel();
})(jQuery);

AOS.init({
  easing: 'ease',
  duration: 1000,
  once: true
});
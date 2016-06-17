(function($){
  // //Load page partials
  $("#nav").load("views/nav.html")
  $("#sponsors-section").load("views/sponsors.html")
  $("#contact-form").load("views/contact.html")
  $("#footer").load("views/footer.html")
  // var body = document.querySelector("body")
  // body.style.display = "block"

  function hideMenu() {
    $("#menu-list").toggleClass("hide")
    $("#menu-shadow").toggleClass("toggle-shadow")
  }

  setTimeout(function(){
    $("#menu-hamburger").on("click", function(){
      hideMenu()
    })
    $("#menu-shadow").on("click", function(){
      hideMenu()
    })
    $("#menu-list a").on("click", function(){
      hideMenu()
    })
  },250)


  //Variables
  var sectionFrom,
  		$slide = $('.slide'),
  		$slideActive = $('.slide.active'),
  		$navLink = $('.nav a'),
      $navLi = $('.nav li'),
  		$body = $('body');

  function init(){
  		// Set active slide visible
  		TweenLite.set($slideActive, {x: '0%'});
  }
  init();

  //Navigation click
  $navLink.on('click', function(e){
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
    //Prevent animation when animating
    if(!$body.hasClass('is-animating')){

      var sectionFrom = $('.slide.active'),
        sectionToID = $(e.target).attr('href'),
        sectionTo = $('div'+sectionToID);

      if(sectionFrom.attr('id') !== sectionTo.attr('id')){
          scrollToSection(sectionFrom, sectionTo);
      }
		}
	});

	function scrollToSection(sectionFrom, sectionTo){

    var heading = sectionTo.find('h1'),
        subheading = sectionTo.find('p'),
        bcg = sectionTo.find('.bcg'),
        bcgFrom = sectionFrom.find('.bcg'),
        tlDown = new TimelineMax({onComplete: setActiveSection(sectionFrom, sectionTo)}),
        tlUp = new TimelineMax();

		if(sectionFrom.index() < sectionTo.index()){
      tlDown.set($body, {className:'+=is-animating'})
            .to(sectionFrom, .7, {x:'-=100%', ease:Sine.easeOut, clearProps:'all'},'0')
            .to(sectionTo, .7, {x:'0%', ease:Sine.easeOut},'0')
            .to(bcgFrom, .7, {x:'30%', ease:Sine.easeOut, clearProps:'all'}, '0')
            .from(bcg, .7, {x:'-30%', ease:Sine.easeOut, clearProps:'all'}, '0')
            .from(heading, .5, {autoAlpha:0, y:40, ease:Sine.easeOut},'0.4')
            .from(subheading, .5, {autoAlpha:0, y:40, ease:Sine.easeOut},'0.5')
            .set($body, {className:'-=is-animating'});
		} else {
      tlUp.set($body, {className:'+=is-animating'})
          .set(sectionTo, {x:'-100%'})
          .to(sectionFrom, .7, {x:'100%', ease:Sine.easeOut, clearProps:'all'},'0')
          .to(sectionTo, .7, {x:'0%', ease:Sine.easeOut},'0')
          .to(bcgFrom, .7, {x:'-30%', ease:Sine.easeOut, clearProps:'all'}, '0')
          .from(bcg, .7, {x:'30%', ease:Sine.easeOut, clearProps:'all'}, '0')
          .from(heading, .5, {autoAlpha:0, y:40, ease:Sine.easeOut},'0.4')
          .from(subheading, .5, {autoAlpha:0, y:40, ease:Sine.easeOut},'0.5')
          .set($body, {className:'-=is-animating'});
		}

	}

  function setActiveSection(sectionFrom, sectionTo) {
    //Add active classs to active slide04
    sectionFrom.removeClass('active')
    sectionTo.addClass('active')
    //Add a body class to highlight the current slide04
    $body.removeAttr('class').addClass($(sectionTo).attr('id')+'-active' )

    //Highligt current slide in Nav
    var currentSlideIndex = parseInt($(sectionTo).attr('id').slice(-2)) - 1
    $navLi.removeAttr('class')
    $navLi.eq(currentSlideIndex).addClass('active')
  }

})(jQuery)

$(document).ready(function(){

  $('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 50
      }, 1000);
      return false;
    }
  }
});
})
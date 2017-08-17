<template lang="html">
  <div class="" style="height: 628px;
    overflow: hidden;">
    <div id="wrapper">
    	<div class="graphic"></div>
    <div class="dog-wrapper">
    	<div class="dog"></div>
    	<div class="dog-bubble">
        </div>
        <div class="bubble-options">
        	<p class="dog-bubble">
            	Are you lost, bud? No worries, I'm an excellent guide!
            </p>
        	<p class="dog-bubble">
    	        <br />
            	Arf! Arf!
            </p>
            <p class="dog-bubble">
            	<br />
            	Don't worry! I'm on it!
            </p>
            <p class="dog-bubble">
            	I wish I had a cookie<br /><img style="margin-top:8px" src="~assets/images/404/cookie.png" alt="cookie" />
            </p>
            <p class="dog-bubble">
            	<br />
            	Geez! This is pretty tiresome!
            </p>
            <p class="dog-bubble">
            	<br />
            	Am I getting close?
            </p>
            <p class="dog-bubble">
            	Or am I just going in circles? Nah...
            </p>
            <p class="dog-bubble">
            	<br />
                OK, I'm officially lost now...
            </p>
            <p class="dog-bubble">
            	I think I saw a <br /><img style="margin-top:8px" src="~assets/images/404/cat.png" alt="cat" />
            </p>
            <p class="dog-bubble">
            	What are we supposed to be looking for, anyway? @_@
            </p>
        </div>
    </div>
    	<div class="planet"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      //prepare letiables
      let degree = 0

      let maxtalk = 0
      let talkbubble = 1

      $(document).ready(function() {
        //count talk bubbles
        $('div.bubble-options p.dog-bubble').each(function() {
          maxtalk++
        })
      })
      //function that handles the talking dog bubble animations
      function dogTalk() {
        let timer = setTimeout(function() {
          //change the bubble html code
          let $temp =
            '<p>' +
            $(
              'div.bubble-options p.dog-bubble:nth-child(' + talkbubble + ')'
            ).html() +
            '</p>'
          $('div.dog-bubble').html($temp)

          //browse through bubble-options
          if (talkbubble < maxtalk) talkbubble++
          else talkbubble = 1

          //show the bubble
          $('.dog-bubble').animate({ opacity: '1', bottom: '10px' }, 400)

          //hide the bubble
          setTimeout(function() {
            $('.dog-bubble').animate({ opacity: '0', bottom: '0px' }, 400)
            dogTalk()
          }, 5000)
        }, 2000)
      }

      //function that handles the planet animation
      function rotate() {
        let $planet = $('div.planet')

        //CSS3
        $planet.css({ transform: 'rotate(' + degree + 'deg)' })
        // For webkit browsers: e.g. Chrome
        $planet.css({ WebkitTransform: 'rotate(' + degree * 2 + 'deg)' })
        // For Mozilla browser: e.g. Firefox
        $planet.css({ '-moz-transform': 'rotate(' + degree + 'deg)' })
        //IE9
        $planet.css({ '-ms-transform': 'rotate(' + degree + 'deg)' })
        //Opera
        $planet.css({ '-o-transform': 'rotate(' + degree + 'deg)' })

        // Animate rotation with a recursive call
        let timer = setTimeout(function() {
          degree -= 0.1
          rotate()
        }, 10)
      }

      //function that handles dog movement animation
      function dogRun() {
        let dog = $('div.dog')

        let timer2 = setTimeout(function() {
          if (dog.css('background-position') == '0px 0px')
            dog.css({ 'background-position': '-80px -2px' })
          else dog.css({ 'background-position': '0px 0px' })

          dogRun()
        }, 130)
      }

      rotate()
      dogRun()
      dogTalk()
    })
  }
}
</script>

<style lang="css">


/* === Main Section === */

#wrapper{

	width:980px;
	margin:0px auto;
	position:relative;
	height:100%;
	background:url(~assets/images/404/sky-shine.jpg) top left no-repeat;

}

h1.not-found-text{

	font-size:50px;
	color:#fff;
	font-family:"SingleSleeveRegular", cursive;
	letter-spacing:2px;
	margin-bottom:20px;

}

div.not-found-text{

	position:absolute;
	top:35px;
	right:0px;
	width:430px;

}

div.graphic{

	position:absolute;
	top:80px;
	left:0px;
	background:url(~assets/images/404/404.png) top left no-repeat;
	width:494px;
	height:331px;

}

div.planet{

	position:absolute;
	bottom:-1100px;
	margin:0px auto;
	width:980px;
	background:url(~assets/images/404/planet.png) center no-repeat;
	height:1920px;
	z-index:0;

}

div.dog-wrapper{

	position:absolute;
	bottom:300px;
	left:440px;

}

div.dog{

	position:absolute;
	bottom:0px;
	left:0px;
	width:80px;
	height:80px;
	z-index:999;
	background:url(~assets/images/404/dog.png) 0px 0px no-repeat;

}

div.search{

	position:absolute;
	top:145px;
	right:0px;
	width:340px;
	background:#eeeeee;
	box-shadow:1px 1px 0 #ffffff inset, 5px 5px 0px #3680b1;
	color:#555555;
	font-size:14px;
	text-shadow:1px 1px 0 #ffffff;
	border-radius:30px;
	padding:10px;
	z-index:999;

}


div.top-menu{

	position:absolute;
	top:200px;
	right:0px;
	color:#ffffff;
	z-index:998;

}

div.top-menu a{

	text-decoration:none;
	color:#eeeeee;
	margin:0px 5px;
	font-size:12px;

}

div.top-menu a:hover{

	color:#abd7fa;

}

div.dog-bubble{

	font-size:14px;
	line-height:1.5;
	font-style:italic;
	height:179px;
	width:246px;
	background:url(../../assets/images/404/bubble.png) top center no-repeat;
	padding:20px 0px;
	position:absolute;
	bottom:0px;
	left:30px;
	z-index:999;
	opacity:0;
	color:#555555;
	font-size:14px;
	text-shadow:1px 1px 0 #ffffff;

}

div.dog-bubble>p{

	text-align:center;
	padding:0px 35px;

}

div.bubble-options{

	opacity:0;
	visibility:hidden;
	display:none;

}



.tipsy { padding: 5px; font-size: 10px; position: absolute; z-index: 9999999999; }
  .tipsy-inner { padding: 5px 8px 4px 8px; background-color: black; color: white; max-width: 200px; text-align: center; }
  .tipsy-inner { border-radius: 3px; -moz-border-radius:3px; -webkit-border-radius:3px; }
  .tipsy-arrow { position: absolute; background: url('../../assets/images/404/tipsy.gif') no-repeat top left; width: 9px; height: 5px; }
  .tipsy-n .tipsy-arrow { top: 0; left: 50%; margin-left: -4px; }
    .tipsy-nw .tipsy-arrow { top: 0; left: 10px; }
    .tipsy-ne .tipsy-arrow { top: 0; right: 10px; }
  .tipsy-s .tipsy-arrow { bottom: 0; left: 50%; margin-left: -4px; background-position: bottom left; }
    .tipsy-sw .tipsy-arrow { bottom: 0; left: 10px; background-position: bottom left; }
    .tipsy-se .tipsy-arrow { bottom: 0; right: 10px; background-position: bottom left; }
  .tipsy-e .tipsy-arrow { top: 50%; margin-top: -4px; right: 0; width: 5px; height: 9px; background-position: top right; }
  .tipsy-w .tipsy-arrow { top: 50%; margin-top: -4px; left: 0; width: 5px; height: 9px; }
</style>

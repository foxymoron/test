<template>
<h1 contenteditable data-heading="Neon" class="pulse">Neon</h1>
</template>

<script>
// JS for content editable trick from Chris Coyier
// https://css-tricks.com/text-effects-css-little-contenteditable-trick/

var h1 = document.querySelector("h1");

h1.addEventListener("input", function() {
  this.setAttribute("data-heading", this.innerText);
});



Resources1×0.5×0.25×Rerun
</script>

<style>
// Import Typefaces to try out
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
@import url('https://fonts.googleapis.com/css?family=Monoton');
@import url('https://fonts.googleapis.com/css?family=Varela+Round');



// Just Colours
$color__pink: rgb(253, 23, 250);
$color__black: rgb(20, 20, 20);

// Thematic Colours
$color__primary: darken($color__pink, 10%);


// Make it night time
body {
  background: $color__black; 
}

h1 {
  // Try changing 'Comfortaa' to 'Monoton' or 'Valera Round'
  font-family: 'Comfortaa', sans-serif; // Rounded typefaces work best
  
  font-size: 15vw;
  font-weight: 300;
  color: transparent;
  text-align: center;
  text-transform: uppercase;
  
  position: relative;
  transform: skew(-5deg, -5deg);
  
  // The text when the lights are off
  text-shadow:
      0 0 15px darken(desaturate($color__primary, 50%), 30%), // Round the tube with a shadow
      0 0 0 $color__primary; // Sign off colour
  
  
  // The text when the lights are on
  &::before {
    content: attr(data-heading); // Get the h1 text
    
    display: block;
    overflow: visible;
    position: absolute;
    left: 0;
    text-align: center;
    width: 100%;
    
    color: transparent;
    text-shadow: 
      0 0 0.06em lighten($color__primary, 38%), // Round the tube with a bright spot
      -0.2em 0 0.3em transparentize(darken($color__primary, 100%), 0.4), // Shadow over glow
      0.04em 0.04em 0.3em transparentize(lighten($color__primary, 20%), 0.4), // Text shaped glow
      0 0 20em $color__primary; // Fill glow
  }
  
}



/* ======================
Set the ANIMATION properties 
Gently pulsing like your Mac Book's soul
========================= */

.pulse::before {
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-name: neon-pulse;
}

// Using opacity on the pseudo elements before/after keeps performance golden
// Check out: http://tobiasahlin.com/blog/how-to-animate-box-shadow/
@keyframes neon-pulse {
  50% {
    opacity: 0; 
  }
}
</style>

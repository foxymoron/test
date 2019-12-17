<template>
<div class="wrapper">
  <div class="floater"> 
    <div class="text">breathe</div>
    <div class="text">EasY</div>
  </div>
</div>
</template>

<script>
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Megrim';

$font: Megrim, cursive;

.wrapper {
  background: linear-gradient(45deg, #d6306d, #fff581);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -100;
  perspective: 500px;
  box-sizing: border-box;
  border: 14px solid white;
}

.floater {
  height: 300px;
  width: 300px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 13px 30px -10px rgba(black,.8);
  transition: all 600ms ease;
  margin: 10px;
  animation: breathe 3s infinite;
  animation-timing-function: easeOutBack;
  color: #d6306d;
  font-size: 3rem;
  flex-direction: column;
  
  .text {
    display: block;
    font-family: $font;
    font-size: 4rem;
    padding-top: .8rem;
    border-top: 2px solid #d6306d;
    
    &:last-child {
      font-size: 5rem;
      margin-top: -.8rem;
      padding-bottom: 1rem;
      border-top: none;
      border-bottom: 2px solid #d6306d;
    }
  }
  
  
  &:hover {
    box-shadow: 0px 60px 30px -30px rgba(black,.3);
    transition: all 600ms ease;
    animation-play-state: paused;
  }
  
  &.right:hover {
        transform: rotate3d(-30,0,-10,5deg) translate3d(10px,-10px,20px);
  }
  &.left:hover {
        transform: rotate3d(30,0,10,5deg) translate3d(-10px,-10px,20px);
  }
}


@keyframes breathe {
  0%   { 
    box-shadow: 0px 13px 30px -10px rgba(black,.8);
    transform: rotate3d(0,0,0,5deg) translate3d(0,0,0);
    opacity: .4;
  }
  50% { 
    box-shadow: 0px 60px 30px -30px rgba(black,.3);
    transform: rotate3d(-30,0,-10,2deg) translate3d(2px,-2px,30px);
    opacity: 1;
  }
  
  100% {
    box-shadow: 0px 13px 30px -10px rgba(black,.8);
    transform: rotate3d(0,0,0,5deg) translate3d(0,0,0);
    opacity: .4;
  }
}
</style>

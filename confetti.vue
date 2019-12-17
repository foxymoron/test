<template>
<div class="button">test</div>
</template>

<script>
let confettiAmount = 60,
    confettiColors = [
        '#7d32f5',
        '#f6e434',
        '#63fdf1',
        '#e672da',
        '#295dfe',
        '#6e57ff'
    ],
    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createConfetti = to => {
        let elem = document.createElement('i'),
            set = Math.random() < 0.5 ? -1 : 1;
        elem.style.setProperty('--x', random(-260, 260) + 'px');
        elem.style.setProperty('--y', random(-160, 160) + 'px');
        elem.style.setProperty('--r', random(0, 360) + 'deg');
        elem.style.setProperty('--s', random(.6, 1));
        elem.style.setProperty('--b', confettiColors[random(0, 5)]);
        to.appendChild(elem);
    };
var elem = document.querySelector('.button');
for(let i = 0; i < confettiAmount; i++) {
                createConfetti(elem);
            }
</script>

<style>
i {
        position: absolute;
        display: block;
        width: 4px;
        height: 4px;
        top: 50%;
        left: 50%;
        margin: -2px 0 0 -2px;
        opacity: var(--o, 0);
        background: var(--b);
        transform: translate(var(--x), var(--y)) scale(var(--s, 1));
            animation: confetti .6s ease-out forwards;
        }
@keyframes confetti {
    from {
        transform: translate(0, 0);
        opacity: 1;
    }
}

.button {
  position: absolute;
  left: 300px;
  top: 300px;
  width: 200px;
  height: 80px;
  background: grey;
}
</style>

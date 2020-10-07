<template>
  <div class="wraper">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>


<style scoped>
$orange: #ff4800;
$dirty-white: #f5f5f5;
$speed: 1s;

body {
  margin: 0;
}

.wraper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  overflow: hidden;
  animation: rotate $speed ease-in-out infinite;

  div {
    height: 150px;
    margin: 0 auto;
    width: 150px;
    box-sizing: border-box;
    float: left;

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(9) {
      background-color: $orange;
      height: 20px;
      width: 20px;
    }
    &:nth-child(1) {
      animation: loop $speed ease-in-out infinite;
    }
    &:nth-child(2) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.1s;
    }
    &:nth-child(5) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.4s;
    }
    &:nth-child(6) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.7s;
    }
    &:nth-child(7) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.3s;
    }
    &:nth-child(8) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.6s;
    }
    &:nth-child(9) {
      animation: loop $speed ease-in-out infinite;
      animation-delay: 0.8s;
    }
  }
}

@keyframes loop {
  0% {
    opacity: 1;
  }

  40% {
    opacity: 0.1;
  }

  100% {
    opacity: 1;
  }
}

body,
html {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
}

.col-sm-2 {
  height: 100px;
}
</style>
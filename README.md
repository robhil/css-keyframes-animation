# css-keyframes-animation

Generate @keyframes rule specifies the animation code

If you want to generate CSS keyframes animation, like so:

```
@keyframes myAnimation {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(100px)
  }
}
```

You have to do this:

```
  const animation = new CssKeyframesAnimation({
    0: {
      transform: translateX(0)   
    },
    100: {
      transform: translateX(100px)
    }
  }, 'myAnimation');
  
  animation.generateKeyframesAnimation();
  
```

[![Travis build status](http://img.shields.io/travis/robhil/css-keyframes-animation.svg?style=flat)](https://travis-ci.org/robhil/css-keyframes-animation)
[![Code Climate](https://codeclimate.com/github/robhil/css-keyframes-animation/badges/gpa.svg)](https://codeclimate.com/github/robhil/css-keyframes-animation)
[![Test Coverage](https://codeclimate.com/github/robhil/css-keyframes-animation/badges/coverage.svg)](https://codeclimate.com/github/robhil/css-keyframes-animation)
[![Dependency Status](https://david-dm.org/robhil/css-keyframes-animation.svg)](https://david-dm.org/robhil/css-keyframes-animation)
[![devDependency Status](https://david-dm.org/robhil/css-keyframes-animation/dev-status.svg)](https://david-dm.org/robhil/css-keyframes-animation#info=devDependencies)

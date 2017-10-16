import CssKeyframesAnimation from '../../src/css-keyframes-animation';

describe('CssKeyframesAnimation', () => {
  describe('.name', () => {
    it ('returns name of animation if it pass trough constructor', () => {
      const name = 'myAnimation';
      const animation = new CssKeyframesAnimation(null, name);
      expect(animation.name).to.be.equal(name);
    });

    it ('returns cuid as a name of animation if name is not passed trough constructor', () => {
      const animation = new CssKeyframesAnimation();
      expect(animation.name).to.be.string;
    });
  });



  describe('.generateCss', () => {
    it ('generates string CSS based on object', () => {
      const animation = new CssKeyframesAnimation();
      const css = animation.generateCss({
        background: 'red',
        color: 'white',
      });

      expect(css).to.be.equal('background: red; color: white;');
    });

    it ('generates string CSS and handles camelCased properties', () => {
      const animation = new CssKeyframesAnimation();
      const css = animation.generateCss({
        backgroundImage: 'url(abc.jpg)',
      });

      expect(css).to.be.equal('background-image: url(abc.jpg);');
    });

    it ('generates string CSS and handles vendor prefixes', () => {
      const animation = new CssKeyframesAnimation();
      const css = animation.generateCss({
        mozAnimation: 'myAnimation',
        webkitAnimation: 'myAnimation',
        oAnimation: 'myAnimation',
        msAccelerator: false,
      });

      expect(css).to.be.equal('-moz-animation: myAnimation; -webkit-animation: myAnimation; -o-animation: myAnimation; -ms-accelerator: false;');
    });
  });

  describe('.generateKeyFrame', () => {
    it ('generates string CSS Keyframe Animation based on object', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
      });
      const keyframe = animation.generateKeyFrame(0);

      expect(keyframe).to.be.equal('0% { background: red; }');
    });
  });

  describe('.insertKeyFrame', () => {
    it ('adds keyframe to existing keyframes object', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
      });
      animation.insertKeyFrame(20, { color: 'red' });

      expect(animation.keyframes[20]).to.be.deep.equal({ color: 'red' });
    });
  });

  describe('.removeKeyFrame', () => {
    it ('removes keyframe from existing keyframes object', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
      });
      animation.removeKeyFrame(0);

      expect(animation.keyframes[0]).to.be.undefined;
    });
  });

  describe('.generateKeyFrames', () => {
    it ('generates string CSS Keyframes Animation based on object and animation and name', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
        100: {
          backgroundImage: 'yellow',
        }
      }, 'myName');

      const keyframe = animation.generateKeyFrames();
      expect(keyframe).to.be.equal('@keyframes myName { 0% { background: red; } 100% { background-image: yellow; } }');
    });

    it ('generates string CSS Keyframes Animation with vendor prefix', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
        100: {
          backgroundImage: 'yellow',
        }
      }, 'myName');

      const keyframe = animation.generateKeyFrames('-webkit-');
      expect(keyframe).to.be.equal('@-webkit-keyframes myName { 0% { background: red; } 100% { background-image: yellow; } }');
    });
  });

  describe('.generateKeyframesAnimation', () => {
    it ('generates string CSS Keyframes Animation based on object and animation and name and save animation in cache', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
        100: {
          backgroundImage: 'yellow',
        }
      }, 'myName');

      const keyframe = animation.generateKeyframesAnimation('-webkit-');
      const result = '@keyframes myName { 0% { background: red; } 100% { background-image: yellow; } } @-webkit-keyframes myName { 0% { background: red; } 100% { background-image: yellow; } }';
      expect(keyframe).to.be.equal(result);
      expect(animation.cachedCss).to.be.equal(result);
    });
  });


  describe('.checksum', () => {
    it ('generates md5 hash based on animation string', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
        100: {
          backgroundImage: 'yellow',
        }
      }, 'myName');


      expect(typeof animation.checksum).to.be.equal('string');
      expect(animation.checksum.length).to.be.equal(32);
    });

    it ('doesnt change value when is called twice on the same animation', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
        100: {
          backgroundImage: 'yellow',
        }
      }, 'myName');


      const result = animation.checksum;
      expect(animation.checksum).to.be.equal(result);
    });

    it ('doesnt change value when is called twice on the same animation and name is changed', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
        100: {
          backgroundImage: 'yellow',
        }
      }, 'myName');


      const result = animation.checksum;
      animation.name = 'abc';
      expect(animation.checksum).to.be.equal(result);
    });

    it ('changes value when is called twice and animation was changed', () => {
      const animation = new CssKeyframesAnimation({
        0: {
          background: 'red',
        },
        100: {
          backgroundImage: 'yellow',
        }
      }, 'myName');


      const result = animation.checksum;
      animation.insertKeyFrame(75, { color: 'red' });
      expect(animation.checksum).to.not.be.equal(result);
    });
  });
});

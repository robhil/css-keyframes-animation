import cuid from 'cuid';
import md5 from 'blueimp-md5';

class CssKeyframesAnimation {

  constructor(keyframes = null, animationName = null) {
    this.name = animationName;
    this.keyframes = keyframes || {};
    this.prefixes = [
      '-webkit-',
      '-moz-',
      '-o-',
      '-ms-'
    ];
    this.cachedCss = null;
    this.checksum = null;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    if (!this._name) {
      this._name = cuid();
    }

    return this._name;
  }

  set checksum(checkSum) {
    this._checksum = checkSum;
  }

  get checksum() {
    if (!this._checksum) {
      this.checksum = md5(JSON.stringify(this.keyframes));
    }

    return this._checksum;
  }

  insertKeyFrame(keyFrameSelector, css) {
    this.keyframes[keyFrameSelector] = css;
    this.cachedCss = null;
    this.checksum = null;
  }

  removeKeyFrame(keyFrameSelector) {
    delete this.keyframes[keyFrameSelector];
    this.cachedCss = null;
    this.checksum = null;
  }

  decamelizeCssProperty(property = '') {
    const decamelizedProperty = property.replace(/([a-z])([A-Z])/g, '$1-$2');
    const regex = new RegExp(`(${this.prefixes.map((prefix) => prefix.substring(1)).join('|')})`, 'i');
    return decamelizedProperty.replace(regex, '-$1').toLowerCase();
  }

  generateCss(css) {
    return Object.keys(css).map((property) => `${this.decamelizeCssProperty(property)}: ${css[property]};`).join(' ').trim();
  }

  parseKeyFrameSelector(keySelector) {
    const percent = parseInt(keySelector);

    if (isNaN(percent)) {
      return keySelector;
    }

    return `${percent}%`;
  }

  generateKeyFrame(keySelector) {
    return `${this.parseKeyFrameSelector(keySelector)} { ${this.generateCss(this.keyframes[keySelector])} }`;
  }

  generateKeyFrames(prefix = '') {
    return `@${prefix}keyframes ${this.name} { ${Object.keys(this.keyframes).map(this.generateKeyFrame.bind(this)).join(' ') } }`;
  }

  generateKeyframesAnimation(prefix) {
    this.cachedCss = this.cachedCss || `${this.generateKeyFrames()} ${prefix ? this.generateKeyFrames(prefix) : ''}`;
    return this.cachedCss;
  }
}

export default CssKeyframesAnimation;

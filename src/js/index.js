let Slider = window.Slider || {};

Slider = (function () {

  function Slider(element, settings) {
    let _ = this;

    _.defaults = {
      counts: {
        desktop: {
          width: 1024,
          count: 3
        },
        tablet: {
          width: 768,
          count: 3
        },
        mobile: {
          width: 400,
          count: 1
        },
      },
      buttons: {
        next: {
          classname: 'next'
        },
        prev: {
          classname: 'prev'
        }
      }
    };
    _.slider = element;

    // ie11 hack
    for (let nextKey in settings) {
      if (Object.prototype.hasOwnProperty.call(settings, nextKey)) {
        _.defaults[nextKey] = settings[nextKey];
      }
    }

    _.options = _.defaults;

    _.init();
  }

  return Slider;
}());

Slider.prototype.init = function() {
  let _ = this;

  _.buildDom();
  _.buildBtn();
  _.initEvent();

  window.onresize = function () {
    _.buildDom();
    _.initEvent();
  }
};

Slider.prototype.buildBtn = function() {
  let _ = this;

  _.buttons = {
    prevBtn: document.createElement('div'),
    nextBtn: document.createElement('div')
  };

  _.buttons.prevBtn.className = _.options.buttons.prev.classname;
  _.buttons.nextBtn.className = _.options.buttons.next.classname;

  _.slider.appendChild(_.buttons.prevBtn);
  _.slider.appendChild(_.buttons.nextBtn);
};

Slider.prototype.buildDom = function() {
  let _ = this,
    sliderOuter = _.slider.getElementsByClassName('slider-outer')[0],
    oldSliderWrap;

  if (sliderOuter !== undefined) {
    oldSliderWrap = _.slider.getElementsByClassName('slider-wrapper')[0];
  } else {
    sliderOuter = document.createElement('div');
    sliderOuter.className = 'slider-outer';
    _.slider.appendChild(sliderOuter);
  }
  sliderOuter.appendChild(_.getDomSliderElements());
  if (oldSliderWrap) {
    oldSliderWrap.parentNode.removeChild(oldSliderWrap)
  }
};

Slider.prototype.getDomSliderElements = function() {
  let _ = this,
    slideArr = _.slider.getElementsByClassName('slider-item'),
    sliderWidth = _.slider.offsetWidth,
    slideWidth = sliderWidth / _.getNeededCount(),
    sliderWrapper = document.createElement('div'),
    sliderWrapperWidth = 0;

  _.elements = [];
  [].slice.call(slideArr).forEach(function(element) {
    let slideStyle = element.currentStyle || window.getComputedStyle(element),
      margin = parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight),
      padding = parseFloat(slideStyle.paddingLeft) + parseFloat(slideStyle.paddingRight),
      border = parseFloat(slideStyle.borderLeftWidth) + parseFloat(slideStyle.borderRightWidth),
      supportWidth = (!isNaN(margin) ? margin : 0) +
        (!isNaN(padding) ? padding : 0) +
        (!isNaN(border) ? border : 0),
      clearSlideWidth = slideWidth - (supportWidth / _.getNeededCount());

    element.style.width = clearSlideWidth + 'px';
    sliderWrapper.appendChild(element);
    sliderWrapperWidth += (clearSlideWidth);
    _.elements.push(element);
  });

  sliderWrapper.className = 'slider-wrapper';
  sliderWrapper.style.width = sliderWrapperWidth + 'px';

  return sliderWrapper;
};

Slider.prototype.initEvent = function() {
  let _ = this,
    translatePositionX = 0,
    sliderWrapper = _.slider.getElementsByClassName('slider-wrapper')[0],
    iterator,
    nextElementCount = _.getNeededCount(),
    prevElementCount;

  _.buttons.nextBtn.addEventListener('click', function () {
    for (
      iterator = nextElementCount;
      iterator < nextElementCount + _.getNeededCount() && iterator < _.elements.length;
      iterator++
    ) {
      translatePositionX -= +_.elements[iterator].style.width.replace('px', '');
    }
    prevElementCount = iterator - _.getNeededCount();
    nextElementCount = iterator;
    if (iterator === _.elements.length) {
      _.buttons.nextBtn.style.display = 'none';
    } else {
      _.buttons.nextBtn.style.display = 'block';
    }
    _.buttons.prevBtn.style.display = 'block';
    sliderWrapper.style.transform = 'translateX(' + translatePositionX + 'px)';
  });

  _.buttons.prevBtn.addEventListener('click', function () {
    iterator = prevElementCount;
    prevElementCount = iterator - _.getNeededCount();
    for (
      ;
      iterator > (prevElementCount) && iterator > 0;
      --iterator
    ) {
      translatePositionX += +_.elements[iterator - 1].style.width.replace('px', '');
    }
    nextElementCount = iterator + _.getNeededCount();
    if (prevElementCount < 0) {
      _.buttons.prevBtn.style.display = 'none';
    } else {
      _.buttons.prevBtn.style.display = 'block';
    }
    _.buttons.nextBtn.style.display = 'block';
    sliderWrapper.style.transform = 'translateX(' + translatePositionX + 'px)';
  });
  _.buttons.nextBtn.style.display = 'block';
  _.buttons.prevBtn.style.display = 'none';
};

Slider.prototype.getNeededCount = function() {
  let _ = this;

  if (screen.width > _.options.counts.desktop.width) {
    return _.options.counts.desktop.count;
  } else if (screen.width > _.options.counts.tablet.width) {
    return _.options.counts.tablet.count;
  }

  return _.options.counts.mobile.count;
};

(function () {
  let caseSliderContainer = document.getElementById('jsSlider'),
    caseSliderContainer2 = document.getElementById('jsSlider2');

  new Slider(caseSliderContainer);
  new Slider(caseSliderContainer2);
})();
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
    _.options = Object.assign({}, _.defaults, settings);

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
    oldSliderWrap.remove();
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
  Array.from(slideArr).forEach(function (element) {
    let slideStyle = element.currentStyle || window.getComputedStyle(element),
      margin = parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight),
      padding = parseFloat(slideStyle.paddingLeft) + parseFloat(slideStyle.paddingRight),
      border = parseFloat(slideStyle.borderLeftWidth) + parseFloat(slideStyle.borderRightWidth),
      supportWidth = margin + padding + border,
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
    translatePositionX = 0;

  let sliderWrapper = _.slider.getElementsByClassName('slider-wrapper')[0];
  //   sliderWrapperWidth = sliderWrapper.offsetWidth,
  //   elementForTranslate = _.slider.getElementsByClassName('slider-outer')[0],
  //   translteWidth = elementForTranslate.offsetWidth;

  let currentElementCount = 2,
    iterator;

  _.buttons.nextBtn.addEventListener('click', function () {
    for (
      iterator = currentElementCount;
      iterator < (currentElementCount + _.getNeededCount()) && iterator <= _.elements.length;
      iterator++
    ) {
      console.log(iterator, currentElementCount, iterator <= _.elements.length, _.elements.length)
      translatePositionX -= +_.elements[iterator].style.width.replace('px', '');
    }
    currentElementCount = iterator;
    if (currentElementCount === _.elements.length) {
      _.buttons.prevBtn.style.display = 'none';
    } else {
      _.buttons.prevBtn.style.display = 'block';
    }
    // if ((translatePositionX - _.slider.offsetWidth) * (-1) < sliderWrapperWidth) {
    //   _.buttons.prevBtn.style.display = 'block';
    //   translatePositionX -= translteWidth + 20;
    //   console.log(translatePositionX, sliderWrapperWidth / 3)
    sliderWrapper.style.transform = 'translateX(' + translatePositionX + 'px)';
    //   if ((translatePositionX - _.slider.offsetWidth) * (-1) < sliderWrapperWidth) {
    //     _.buttons.nextBtn.style.display = 'block';
    //   } else {
    //     _.buttons.nextBtn.style.display = 'none';
    //   }
    //   console.log(translatePositionX)
    // }
  });

  _.buttons.prevBtn.addEventListener('click', function () {
    for (
      iterator = currentElementCount;
      iterator > (currentElementCount - _.getNeededCount()) && iterator >= 0;
      iterator--
    ) {
      console.log(iterator, currentElementCount)
      translatePositionX += +_.elements[iterator].style.width.replace('px', '');
    }
    currentElementCount = iterator;
    sliderWrapper.style.transform = 'translateX(' + translatePositionX + 'px)';
    if (currentElementCount === 0) {
      _.buttons.prevBtn.style.display = 'none';
    } else {
      _.buttons.prevBtn.style.display = 'block';
    }
    // console.log(translatePositionX + _.slider.offsetWidth > 0, translatePositionX + _.slider.offsetWidth)
    // if (translatePositionX + _.slider.offsetWidth < 0) {
    //   _.buttons.nextBtn.style.display = 'block';
    //
    //   console.log(translatePositionX)
    //   if (translatePositionX + _.slider.offsetWidth < 0) {
    //     _.buttons.prevBtn.style.display = 'block';
    //   } else {
    //     _.buttons.prevBtn.style.display = 'none';
    //   }
    //   translatePositionX += translteWidth + 20;
    //   sliderWrapper.style.transform = 'translateX(' + translatePositionX + 'px)';
    // }
  });

  // _.buttons.prevBtn.style.display = 'none';
  // if ((translatePositionX - _.slider.offsetWidth) * (-1) >= sliderWrapperWidth) {
  //   _.buttons.nextBtn.style.display = 'none';
  // }
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
  let caseSliderContainer = document.getElementById('jsSlider');

  new Slider(caseSliderContainer);
  // window.onresize = function () {
  //   new Slider(caseSliderContainer);
  // };
})();
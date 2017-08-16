let Slider = window.Slider || {};

Slider = (function () {

  function Slider(element, settings) {
    let _ = this;

    _.defaults = {
      desktopCount: 3
    };

    _.slider = element;

    _.options = Object.assign({}, _.defaults, settings);

    _.init();
  }

  return Slider;
}());

Slider.prototype.init = function() {
  let _ = this,
    translatePositionX = 0,
    slideArr = _.slider.getElementsByClassName('slide-item');

  _.buildBtn();

  let sliderWidth = screen.width > 728 ? _.slider.offsetWidth - 40 : _.slider.offsetWidth,
    slideWidth = screen.width > 728 ?
      // todo 31 - hardcore
      (sliderWidth / _.options.desktopCount) - (31 / _.options.desktopCount * 2) : sliderWidth,
    sliderWrapperWidth = (slideArr.length * slideWidth) + 31 * (slideArr.length - 1);

  Array.from(slideArr).forEach(function (element) {
    element.style.width = slideWidth + 'px';
  });

  _.buttons.nextBtn.addEventListener('click', function () {
    if ((translatePositionX - sliderWidth) * (-1) < sliderWrapperWidth) {
      _.buttons.prevBtn.style.display = 'block';
      translatePositionX = screen.width > 728 ?
        translatePositionX - sliderWidth - 31 : translatePositionX - sliderWidth;
      _.slider.children[0].style.transform = 'translateX(' + translatePositionX + 'px)';
      if ((translatePositionX - sliderWidth) * (-1) < sliderWrapperWidth) {
        _.buttons.nextBtn.style.display = 'block';
      } else {
        _.buttons.nextBtn.style.display = 'none';
      }
    }
  });

  _.buttons.prevBtn.addEventListener('click', function () {
    if (translatePositionX + sliderWidth <= 0) {
      _.buttons.nextBtn.style.display = 'block';
      translatePositionX = screen.width > 728 ?
        translatePositionX + sliderWidth + 31 : translatePositionX + sliderWidth;
      _.slider.children[0].style.transform = 'translateX(' + translatePositionX + 'px)';
      if (translatePositionX + sliderWidth <= 0) {
        _.buttons.prevBtn.style.display = 'block';
      } else {
        _.buttons.prevBtn.style.display = 'none';
      }
    }
  });

  _.buttons.prevBtn.style.display = 'none';
  if ((translatePositionX - sliderWidth) * (-1) > sliderWrapperWidth) {
    _.buttons.nextBtn.style.display = 'none';
  }
};

Slider.prototype.buildBtn = function() {
  let _ = this;

  _.buttons = {
    prevBtn: document.createElement('div'),
    nextBtn: document.createElement('div')
  };

  _.buttons.prevBtn.className = 'prev'; //todo classbtn to setting
  _.buttons.nextBtn.className = 'next'; //todo classbtn to setting

  _.slider.appendChild(_.buttons.prevBtn);
  _.slider.appendChild(_.buttons.nextBtn);
};

(function () {
  let caseSliderContainer = document.getElementById('jsCasesSlider'),
    customerSlider = document.getElementById('jsSliderCustomer');

  new Slider(caseSliderContainer);
  new Slider(customerSlider, { desktopCount: 8 });

  window.onresize = function () {
    new Slider(caseSliderContainer);
    new Slider(customerSlider);
  };
})();
import {TimelineMax, TweenMax} from 'gsap';

export const speed = 1;
export const ease = 'Power3.easeOut';

export const initShowPrevious = slider => {
  const tl = new TimelineMax();
  tl.add(TweenMax.set(slider, {x: '-=70vw'}));
  return tl;
};

export const initShowNext = (el, slider) => {
  const tl = new TimelineMax();
  // prettier-ignore
  tl.delay(0.1)
    .add(TweenMax.set(el, {display: 'none'}), 'init')
    .add(TweenMax.set(slider, {x: '+=70vw'}), 'init');
  return tl;
};

export const moveSlider = (slider, x) => {
  const tl = new TimelineMax();
  tl.to(slider, 1, {x, ease});
  return tl;
};

export const disable = el => {
  const {hero, card} = getLayouts(el);
  const tl = new TimelineMax();
  tl.to(hero, 1, {scale: '0.9'}).to(card, 1, {opacity: '0'}, '-=1');
  return tl;
};

export const hide = el => {
  const tl = new TimelineMax();
  tl.add(disable(el)).totalDuration('0');
  return tl;
};

export const active = el => {
  const {hero, card} = getLayouts(el);
  const tl = new TimelineMax();
  tl.to(hero, 1, {scale: '1'}).to(card, 1, {opacity: '1'}, '-=1');
  return tl;
};

export const showHome = el => {
  const {hero, card} = getLayouts(el);
  const tl = new TimelineMax();
  tl.to(hero, 1, {scale: '1'}).to(card, 1, {opacity: '1'});
  return tl;
};

export const loadImages = el => {
  Array.from(el.querySelectorAll('source, img')).forEach(tag => {
    if (tag.dataset.srcset) {
      tag.srcset = tag.dataset.srcset;
      tag.dataset.srcset = '';
    } else if (tag.dataset.src) {
      tag.src = tag.dataset.src;
      tag.dataset.src = '';
    }
  });
};

const getLayouts = el => {
  return {
    hero: el.querySelector('.slider__hero'),
    card: el.querySelector('.slider__card'),
  };
};

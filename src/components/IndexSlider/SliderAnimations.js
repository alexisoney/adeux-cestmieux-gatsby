import {TimelineMax, TweenMax} from 'gsap';

export const speed = 0.4;
export const ease = 'Power2.easeInOut';

export const initShowPrevious = slider => {
  const tl = new TimelineMax();
  tl.add(TweenMax.set(slider, {x: '-=70vw'}));
  return tl;
};

export const initShowNext = (el, slider) => {
  const tl = new TimelineMax();
  // prettier-ignore
  tl.add(TweenMax.set(el, {display: 'none'}), 'init')
    .add(TweenMax.set(slider, {x: '+=70vw'}), 'init');
  return tl;
};

export const moveSlider = (slider, x) => {
  const tl = new TimelineMax();
  tl.to(slider, 1, {x, ease});
  return tl;
};

export const disable = el => {
  const {hero, card, date} = getLayouts(el);
  const tl = new TimelineMax();
  tl.fromTo(hero, 1, {scale: '1'}, {scale: '0.9'}).fromTo(
    [card, date],
    1,
    {autoAlpha: '0'},
    {autoAlpha: '0'}
  );
  return tl;
};

export const hide = el => {
  const tl = new TimelineMax();
  tl.add(disable(el)).totalDuration('0');
  return tl;
};

export const active = el => {
  const {hero, card, date} = getLayouts(el);
  const tl = new TimelineMax();
  tl.fromTo([card, date], 1, {autoAlpha: '0'}, {autoAlpha: '1'}).fromTo(
    hero,
    1,
    {scale: '0.9'},
    {scale: '1'}
  );
  return tl;
};

export const showHome = el => {
  const {hero, card, date} = getLayouts(el);
  const tl = new TimelineMax();
  tl.to(hero, 1, {scale: '1'}).to([card, date], 1, {autoAlpha: '1'});
  return tl;
};

const getLayouts = el => {
  return {
    hero: el.querySelector('.slider__hero'),
    card: el.querySelector('.slider__card'),
    date: el.querySelector('.slider__date'),
  };
};

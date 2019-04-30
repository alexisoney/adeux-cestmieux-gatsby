import React from 'react';
import SliderItem from './SliderItem';
import {TweenLite, TimelineLite} from 'gsap';
import {Transition, TransitionGroup} from 'react-transition-group';
import * as Animations from './SliderAnimations';
import Hammer from 'react-hammerjs';

const {speed} = Animations;

class IndexSlider extends React.Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
    this.state = {
      offset: 0,
      prevOffset: null,
      animate: false,
      isResizing: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.handleKeyUp);
  }

  render() {
    const {offset} = this.state;

    return (
      <Hammer onSwipe={e => this.handleSwipe(e)}>
        <div className={this.state.prevOffset ? 'slider' : 'slider slider--is-first-render'}>
          <div ref={this.slider} className='slider__container'>
            <TransitionGroup component={null}>
              {this.props.posts.map(({node}, id) => {
                if (id >= offset - 2 && id <= offset + 2) {
                  let className = '';
                  let onClick = null;
                  if (id === offset - 2) {
                    className = 'prevBuffer';
                  } else if (id === offset - 1) {
                    className = 'prev';
                    onClick = this.showPrevious;
                  } else if (id === offset) {
                    className = 'active';
                  } else if (id === offset + 1) {
                    onClick = this.showNext;
                    className = 'next';
                  } else if (id === offset + 2) {
                    className = 'nextBuffer';
                  }

                  return (
                    <Transition
                      key={node.id}
                      timeout={speed * 1000}
                      onEnter={this.onEnter}
                      onExit={this.onExit}
                    >
                      <SliderItem
                        className={className}
                        onClick={onClick}
                        data={node}
                        url={this.props.url}
                      />
                    </Transition>
                  );
                }

                return null;
              })}
            </TransitionGroup>
          </div>
        </div>
      </Hammer>
    );
  }

  showNext = () => {
    if (!this.state.animate) {
      this.setState(prevState => ({
        offset: prevState.offset + 1,
        prevOffset: prevState.offset,
        animate: true,
      }));
    }
  };

  showPrevious = () => {
    if (!this.state.animate) {
      this.setState(prevState => ({
        offset: prevState.offset - 1,
        prevOffset: prevState.offset,
        animate: true,
      }));
    }
  };

  onEnter = el => {
    // Go to previous + has previous items to show
    if (this.state.offset < this.state.prevOffset) {
      const {items, tl} = this.createTimeline();
      tl.add(Animations.initShowPrevious(this.slider.current))
        .add(Animations.disable(items.next))
        .add(Animations.moveSlider(this.slider.current, '+=70vw'))
        .add(Animations.active(items.active))
        .totalDuration(speed);
    }
    // Go to next but is displaying first items
    else if (this.state.offset <= 2) {
      const {items, tl} = this.createTimeline();
      tl.add(Animations.disable(items.prev))
        .add(Animations.moveSlider(this.slider.current, '-=70vw'))
        .add(Animations.active(items.active))
        .totalDuration(speed);
    }
  };

  onExit = el => {
    // Go to next + has previous items to show
    if (this.state.offset > this.state.prevOffset) {
      const {items, tl} = this.createTimeline();
      tl.add(Animations.initShowNext(el, this.slider.current))
        .add(Animations.disable(items.prev))
        .add(Animations.moveSlider(this.slider.current, '-=70vw'))
        .add(Animations.active(items.active))
        .totalDuration(speed);
    }
    // Go to previous but is displaying first items
    else if (this.state.offset < 2) {
      const {items, tl} = this.createTimeline();
      tl.add(Animations.disable(items.next))
        .add(Animations.moveSlider(this.slider.current, '+=70vw'))
        .add(Animations.active(items.active))
        .totalDuration(speed);
    }
  };

  createTimeline = () => {
    return {
      items: {
        prev: this.slider.current.querySelector('.slider__item--is-prev'),
        active: this.slider.current.querySelector('.slider__item--is-active'),
        next: this.slider.current.querySelector('.slider__item--is-next'),
      },
      tl: new TimelineLite({
        onComplete: () => {
          this.setSliderPosition();
          this.setState({animate: false});
        },
      }),
    };
  };

  setSliderPosition = () => {
    let x;
    switch (this.state.offset) {
      case 0:
        x = 15;
        break;
      case 1:
        x = -55;
        break;
      default:
        x = -125;
    }
    TweenLite.set(this.slider.current, {x: x + 'vw'});
  };

  handleKeyUp = e => {
    // Is left arrow?
    if (e.keyCode === 37) {
      if (this.state.offset > 0 && !this.state.animate) {
        this.showPrevious();
      }
    }
    // Is right arrow?
    else if (e.keyCode === 39) {
      if (this.state.offset < this.props.posts.length - 1 && !this.state.animate) {
        this.showNext();
      }
    }
  };

  handleSwipe = ({deltaX}) => {
    if (deltaX > 0) {
      if (this.state.offset > 0 && !this.state.animate) {
        this.showPrevious();
      }
    } else {
      if (this.state.offset < this.props.posts.length - 1 && !this.state.animate) {
        this.showNext();
      }
    }
  };

  handleResize = () => {
    if (!this.state.isResizing) {
      this.setState({isResizing: true});
      this.setSliderPosition();
      setTimeout(() => {
        this.setState({isResizing: false});
        this.setSliderPosition();
      }, 1000);
    }
  };
}

export default IndexSlider;

import Swiper from 'react-native-swiper';
import React, { Component, PropTypes } from 'react';

class SuggestionSlider extends Component {
swiper:Object;
currentIndex:Number;

componentWillReceiveProps(nextProps) {
  if (this.currentIndex > 0) {
  this.swiper.scrollBy(this.currentIndex * -1); //offset
  }
}

_onMomentumScrollEnd(e, state, context) {
  this.currentIndex = state.index;
}

render() {
  return (
    <Swiper style={styles.swiper}
      ref={component => this.swiper = component}
      onMomentumScrollEnd = {this._onMomentumScrollEnd.bind(this)}
      loop={true}
      horizontal = {true} />
    )
  }
}

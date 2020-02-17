const getters = {
  getMapState: state => {
    return state.showMap;
  },

  getCarouselSlides: state => {
    return state.carouselSlides;
  }
};

export default getters;

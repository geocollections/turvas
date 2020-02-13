const getters = {
  getSplitViewState: state => {
    return state.isSplitView;
  },

  getMapViewState: state => {
    return state.isMapView;
  },

  getDataViewState: state => {
    return state.isDataView;
  }
};

export default getters;

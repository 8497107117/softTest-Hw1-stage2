import Immutable from 'immutable';

const initialState = Immutable.fromJS({
	types: []
});

const gunType = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default gunType;
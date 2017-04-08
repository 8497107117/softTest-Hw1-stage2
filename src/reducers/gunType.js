import Immutable from 'immutable';

const initialState = Immutable.fromJS({
	type: ''
});

const gunType = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default gunType;
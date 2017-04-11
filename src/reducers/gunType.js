import Immutable from 'immutable';

const initialState = Immutable.fromJS({
	types: []
});

const gunType = (state = initialState, action) => {
  switch (action.type) {
    default:
        return state.updateIn(['types'], arr => arr.push('fuck'));
  }
};

export default gunType;

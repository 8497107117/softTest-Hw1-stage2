import Immutable from 'immutable';

const initialState = Immutable.fromJS({
	types: [],
    HR: 30,
    AMMU: 30,
    RA: 30,
    PART: 30
});

const gunType = (state = initialState, action) => {
    switch (action.action) {
        case 'ONCHANGE':
            console.log(action);
            return state.set(action.type, action.amount);
            break;
        default:
            return state;
    }
};

export default gunType;

import Immutable from 'immutable';
import GunData from './GunData';

const initialState = Immutable.fromJS({
	types: [],
    HR: 30,
    AMMU: 30,
    RA: 30,
    PART: 30
});

const GunTypeClac = (state) => {
    console.log(GunData);
    return state;
};

const gunType = (state = initialState, action) => {
    switch (action.action) {
        case 'ONCHANGE':
            console.log(action);
            state.set(action.type, action.amount);
            break;
        default:
            return state;
    }

    return GunTypeClac(state);
};

export default gunType;

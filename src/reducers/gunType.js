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
    let guns = [];
    for(let t in GunData){
        let sum = parseInt(state.get('HR')) + parseInt(state.get('AMMU')) 
            + parseInt(state.get('RA')) + parseInt(state.get('PART'));
        if(GunData[t].SP){
            console.log(sum);
            switch(t){
                case 'LowestHG':
                    if(sum <= 920){
                        guns = guns.concat(GunData[t].guns);
                    }
                    break;
                case 'GeneralAR':
                    if(sum >= 800){
                        guns = guns.concat(GunData[t].guns);
                    }
                    break;
            }
        } else {
            let threshold = GunData[t].threshold;
            if(state.get('HR') >= threshold[0] && 
                state.get('AMMU') >= threshold[1] &&
                state.get('RA') >= threshold[2] &&
                state.get('PART') >= threshold[3]){
                
                if('RemainHG' === t && sum > 920)
                    continue;
                guns = guns.concat(GunData[t].guns);
            }
        }
    }
    return state.set('types', guns);
};

const gunType = (state = initialState, action) => {
    switch (action.type) {
        case 'ONCHANGE':
            console.log(action);
            return GunTypeClac(state.set(action.kind, action.amount));
            break;
        default:
            return state;
            break;
    }
};

export default gunType;

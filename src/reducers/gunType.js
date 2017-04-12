import Immutable from 'immutable';
import GunData from './GunData';

const initialState = Immutable.fromJS({
    names: [],
    types: [],
    HR: 30,
    AMMU: 30,
    RA: 30,
    PART: 30
});

const GunTypeClac = (state) => {
    let guns = [];
    let types = [];
    let hasType = [false, false, false, false, false];
    let resources = [parseInt(state.get('HR')), parseInt(state.get('AMMU')), 
                    parseInt(state.get('RA')), parseInt(state.get('PART'))];
    for(let i of resources){
        console.log(i);
        if(i<30 || i > 999){
            console.log("invalid");
            return state.set('types', []).set('guns', []);
        }
    }
    for (let t in GunData) {
        let sum = resources.reduce((a,b)=>{return a+b});
        if (GunData[t].SP) {
            switch (t) {
                case 'LowestHG':
                    if (sum <= 920) {
                        guns = guns.concat(GunData[t].guns);
                        hasType[1] = true;
                    }
                    break;
                case 'GeneralAR':
                    if (sum >= 800) {
                        guns = guns.concat(GunData[t].guns);
                        hasType[0] = true;
                    }
                    break;
            }
        } else {
            let threshold = GunData[t].threshold;
            if (state.get('HR') >= threshold[0] &&
                state.get('AMMU') >= threshold[1] &&
                state.get('RA') >= threshold[2] &&
                state.get('PART') >= threshold[3]) {

                if ('RemainHG' === t && sum > 920)
                    continue;
                guns = guns.concat(GunData[t].guns);
                if(GunData[t].type === 'AR')
                    hasType[0] = true;
                else if(GunData[t].type === 'HG') 
                    hasType[1] = true;
                else if(GunData[t].type === 'MG')
                    hasType[2] = true;               
                else if(GunData[t].type === 'RF')
                    hasType[3] = true;
                else if(GunData[t].type === 'SMG')
                    hasType[4] = true;
            }
        }
    }
    if(hasType[0])
        types.push('AR');
    if(hasType[1])
        types.push('HG');
    if(hasType[2])
        types.push('MG');
    if(hasType[3])
        types.push('RF');
    if(hasType[4])
        types.push('SMG');
    return state.set('names', guns).set('types', types);
};

const gunType = (state = initialState, action) => {
    switch (action.type) {
        case 'ONCHANGE':
            return GunTypeClac(state.set(action.kind, action.amount));
            break;
        default:
            return state;
            break;
    }
};

export default gunType;

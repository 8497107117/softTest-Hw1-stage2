import Immutable from 'immutable';
import gunType from './gunType';

const initialState = Immutable.fromJS({
        names: [],
        types: [],
        HR: 30,
        AMMU: 30,
        RA: 30,
        PART: 30
});

const testMaterial = (HR, AMMU, RA, PART, types) => {
        let state = initialState;
        state = gunType(state, {
                type: 'ONCHANGE',
                kind: 'HR',
                amount: HR
        });
        state = gunType(state, {
                type: 'ONCHANGE',
                kind: 'AMMU',
                amount: AMMU
        });
        state = gunType(state, {
                type: 'ONCHANGE',
                kind: 'RA',
                amount: RA
        });
        state = gunType(state, {
                type: 'ONCHANGE',
                kind: 'PART',
                amount: PART
        });
        expect(state.get('types'))
                .toEqual(types)
}

describe('default', () => {
        it('should return the initial state', () => {
                expect(gunType(undefined, {})).toEqual(initialState)
        })
})

describe('boundary value', () => {
        describe('normal', () => {
                it('min', () => {
                        testMaterial(30, 500, 500, 500, ['AR', 'SMG'])
                        testMaterial(500, 30, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 30, 500, ['AR', 'SMG'])
                        testMaterial(500, 500, 500, 30, ['AR', 'RF', 'SMG'])
                })
                it('normal', () => {
                        testMaterial(500, 500, 500, 500, ['AR', 'RF', 'SMG'])
                })
                it('max', () => {
                        testMaterial(999, 500, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 999, 500, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 500, 999, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 500, 999, ['AR', 'RF', 'SMG'])
                })
        })
        describe('robust', () => {
                it('min-', () => {
                        testMaterial(29, 500, 500, 500, [])
                        testMaterial(500, 29, 500, 500, [])
                        testMaterial(500, 500, 29, 500, [])
                        testMaterial(500, 500, 500, 29, [])
                })
                it('min+', () => {
                        testMaterial(1000, 500, 500, 500, [])
                        testMaterial(500, 1000, 500, 500, [])
                        testMaterial(500, 500, 1000, 500, [])
                        testMaterial(500, 500, 500, 1000, [])
                })
        })
        describe('worst', () => {
                it('min of human resources', () => {
                        testMaterial(30, 30, 30, 30, ['HG', 'SMG'])
                        testMaterial(30, 30, 30, 500, ['HG', 'SMG'])
                        testMaterial(30, 30, 30, 999, ['AR', 'SMG'])
                        testMaterial(30, 30, 500, 30, ['HG', 'SMG'])
                        testMaterial(30, 30, 500, 500, ['AR', 'SMG'])
                        testMaterial(30, 30, 500, 999, ['AR', 'SMG'])
                        testMaterial(30, 30, 999, 30, ['AR', 'SMG'])
                        testMaterial(30, 30, 999, 500, ['AR', 'SMG'])
                        testMaterial(30, 30, 999, 999, ['AR', 'SMG'])
                        testMaterial(30, 500, 30, 30, ['HG', 'SMG'])
                        testMaterial(30, 500, 30, 500, ['AR', 'SMG'])
                        testMaterial(30, 500, 30, 999, ['AR', 'SMG'])
                        testMaterial(30, 500, 500, 30, ['AR', 'SMG'])
                        testMaterial(30, 500, 500, 500, ['AR', 'SMG'])
                        testMaterial(30, 500, 500, 999, ['AR', 'SMG'])
                        testMaterial(30, 500, 999, 30, ['AR', 'SMG'])
                        testMaterial(30, 500, 999, 500, ['AR', 'SMG'])
                        testMaterial(30, 500, 999, 999, ['AR', 'SMG'])
                        testMaterial(30, 999, 30, 30, ['AR', 'SMG'])
                        testMaterial(30, 999, 30, 500, ['AR', 'SMG'])
                        testMaterial(30, 999, 30, 999, ['AR', 'SMG'])
                        testMaterial(30, 999, 500, 30, ['AR', 'SMG'])
                        testMaterial(30, 999, 500, 500, ['AR', 'SMG'])
                        testMaterial(30, 999, 500, 999, ['AR', 'SMG'])
                        testMaterial(30, 999, 999, 30, ['AR', 'SMG'])
                        testMaterial(30, 999, 999, 500, ['AR', 'SMG'])
                        testMaterial(30, 999, 999, 999, ['AR', 'SMG'])
                })
                it('normal of human resources', () => {
                        testMaterial(500, 30, 30, 30, ['HG', 'SMG'])
                        testMaterial(500, 30, 30, 500, ['AR', 'SMG'])
                        testMaterial(500, 30, 30, 999, ['AR', 'SMG'])
                        testMaterial(500, 30, 500, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 30, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 30, 500, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 30, 999, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 30, 999, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 30, 999, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 30, 30, ['AR', 'SMG'])
                        testMaterial(500, 500, 30, 500, ['AR', 'SMG'])
                        testMaterial(500, 500, 30, 999, ['AR', 'SMG'])
                        testMaterial(500, 500, 500, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 500, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 999, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 999, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 999, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 999, 30, 30, ['AR', 'SMG'])
                        testMaterial(500, 999, 30, 500, ['AR', 'MG', 'SMG'])
                        testMaterial(500, 999, 30, 999, ['AR', 'MG', 'SMG'])
                        testMaterial(500, 999, 500, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 999, 500, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 999, 500, 999, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 999, 999, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 999, 999, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 999, 999, 999, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('max of human resources', () => {
                        testMaterial(999, 30, 30, 30, ['AR', 'SMG'])
                        testMaterial(999, 30, 30, 500, ['AR', 'SMG'])
                        testMaterial(999, 30, 30, 999, ['AR', 'SMG'])
                        testMaterial(999, 30, 500, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 30, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 30, 500, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 30, 999, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 30, 999, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 30, 999, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 500, 30, 30, ['AR', 'SMG'])
                        testMaterial(999, 500, 30, 500, ['AR', 'SMG'])
                        testMaterial(999, 500, 30, 999, ['AR', 'SMG'])
                        testMaterial(999, 500, 500, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 500, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 500, 500, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 500, 999, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 500, 999, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 500, 999, 999, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 999, 30, 30, ['AR', 'SMG'])
                        testMaterial(999, 999, 30, 500, ['AR', 'MG', 'SMG'])
                        testMaterial(999, 999, 30, 999, ['AR', 'MG', 'SMG'])
                        testMaterial(999, 999, 500, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 999, 500, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(999, 999, 500, 999, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(999, 999, 999, 30, ['AR', 'RF', 'SMG'])
                        testMaterial(999, 999, 999, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(999, 999, 999, 999, ['AR', 'MG', 'RF', 'SMG'])
                })
        })
})

describe('equivalence class', () => {
        describe('normal', () => {
                it('AR', () => {
                        testMaterial(500, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('HG', () => {
                        testMaterial(130, 130, 130, 130, ['HG', 'SMG'])
                })
                it('MG', () => {
                        testMaterial(700, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('RF', () => {
                        testMaterial(650, 500, 650, 500, ['AR', 'RF', 'SMG'])
                })
                it('SMG', () => {
                        testMaterial(500, 500, 500, 500, ['AR', 'RF', 'SMG'])
                })
        })
        describe('robust', () => {
                it('strong', () => {
                        testMaterial(29, 500, 500, 500, []);
                        testMaterial(500, 29, 500, 500, []);
                        testMaterial(500, 500, 29, 500, []);
                        testMaterial(500, 500, 29, 500, []);
                        testMaterial(29, 29, 500, 500, []);
                        testMaterial(29, 500, 29, 500, []);
                        testMaterial(29, 500, 500, 29, []);
                        testMaterial(500, 29, 29, 500, []);
                        testMaterial(500, 29, 500, 29, []);
                        testMaterial(500, 500, 29, 29, []);
                        testMaterial(29, 29, 29, 500, []);
                        testMaterial(29, 29, 500, 29, []);
                        testMaterial(29, 500, 29, 29, []);
                        testMaterial(500, 29, 29, 29, []);
                        testMaterial(29, 29, 29, 29, []);
                })
        })
})

describe('edge testing', () => {
        describe('normal', () => {
                it('min of AR', () => {
                        testMaterial(30, 700, 700, 500, ['AR', 'SMG'])
                        testMaterial(500, 400, 700, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 700, 400, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 700, 700, 30, ['AR', 'RF', 'SMG'])
                })
                it('normal of AR', () => {
                        testMaterial(500, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('max of AR', () => {
                        testMaterial(999, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 999, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 700, 999, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 700, 700, 999, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('min of HG', () => {
                        testMaterial(30, 200, 200, 200, ['HG', 'SMG'])
                        testMaterial(200, 30, 200, 200, ['HG', 'SMG'])
                        testMaterial(200, 200, 30, 200, ['HG', 'SMG'])
                        testMaterial(200, 200, 200, 30, ['HG', 'SMG'])
                })
                it('normal of HG', () => {
                        testMaterial(130, 130, 130, 130, ['HG', 'SMG'])
                })
                it('max of HG', () => {
                        testMaterial(830, 200, 200, 200, ['AR', 'SMG'])
                        testMaterial(200, 830, 200, 200, ['AR', 'SMG'])
                        testMaterial(200, 200, 830, 200, ['AR', 'SMG'])
                        testMaterial(200, 200, 200, 830, ['AR', 'SMG'])
                })
                it('min of MG', () => {
                        testMaterial(400, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(700, 600, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(700, 800, 30, 650, ['AR', 'MG', 'SMG'])
                        testMaterial(700, 800, 500, 300, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('normal of MG', () => {
                        testMaterial(700, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('max of MG', () => {
                        testMaterial(999, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(700, 999, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(700, 800, 999, 650, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(700, 800, 500, 999, ['AR', 'MG', 'RF', 'SMG'])
                })
                it('min of RF', () => {
                        testMaterial(300, 500, 650, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(650, 30, 650, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(650, 500, 300, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(650, 500, 650, 30, ['AR', 'RF', 'SMG'])
                })
                it('normal of RF', () => {
                        testMaterial(650, 500, 650, 500, ['AR', 'RF', 'SMG'])
                })
                it('max of RF', () => {
                        testMaterial(999, 500, 650, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(650, 999, 650, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(650, 500, 999, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(650, 500, 650, 999, ['AR', 'RF', 'SMG'])
                })
                it('min of SMG', () => {
                        testMaterial(30, 500, 500, 500, ['AR', 'SMG'])
                        testMaterial(500, 30, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 30, 500, ['AR', 'SMG'])
                        testMaterial(500, 500, 500, 30, ['AR', 'RF', 'SMG'])
                })
                it('normal of SMG', () => {
                        testMaterial(500, 500, 500, 500, ['AR', 'RF', 'SMG'])
                })
                it('max of SMG', () => {
                        testMaterial(999, 500, 500, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 999, 500, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 500, 999, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 500, 500, 999, ['AR', 'RF', 'SMG'])
                })
        })
        describe('robust', () => {
                it('min- of AR', () => {
                        testMaterial(29, 700, 700, 500, [])
                        testMaterial(500, 399, 700, 500, ['AR', 'RF', 'SMG'])
                        testMaterial(500, 700, 399, 500, ['AR', 'MG', 'RF', 'SMG'])
                        testMaterial(500, 700, 700, 29, [])
                })
                it('max+ of AR', () => {
                        testMaterial(1000, 700, 700, 500, [])
                        testMaterial(500, 1000, 700, 500, [])
                        testMaterial(500, 700, 1000, 500, [])
                        testMaterial(500, 700, 700, 1000, [])
                })
                it('min- of HG', () => {
                        testMaterial(29, 230, 230, 230, [])
                        testMaterial(230, 29, 230, 230, [])
                        testMaterial(230, 230, 29, 230, [])
                        testMaterial(230, 230, 230, 29, [])
                })
                it('max+ of HG', () => {
                        testMaterial(831, 230, 230, 230, ['AR', 'SMG'])
                        testMaterial(230, 831, 230, 230, ['AR', 'SMG'])
                        testMaterial(230, 230, 831, 230, ['AR', 'SMG'])
                        testMaterial(230, 230, 230, 831, ['AR', 'SMG'])
                })
                it('min- of MG', () => {
                        testMaterial(399, 800, 500, 650, ['AR', 'RF', 'SMG'])
                        testMaterial(700, 599, 500, 650, ['AR', 'RF', 'SMG'])
                        testMaterial(700, 800, 29, 650, [])
                        testMaterial(700, 800, 500, 299, ['AR', 'RF', 'SMG'])
                })
                it('max+ of MG', () => {
                        testMaterial(1000, 800, 500, 650, [])
                        testMaterial(700, 1000, 500, 650, [])
                        testMaterial(700, 800, 1000, 650, [])
                        testMaterial(700, 800, 500, 1000, [])
                })
                it('min- of RF', () => {
                        testMaterial(299, 500, 650, 500, ['AR', 'SMG'])
                        testMaterial(650, 29, 650, 500, [])
                        testMaterial(650, 500, 299, 500, ['AR', 'SMG'])
                        testMaterial(650, 500, 650, 29, [])
                })
                it('max+ of RF', () => {
                        testMaterial(1000, 500, 650, 500, [])
                        testMaterial(650, 1000, 650, 500, [])
                        testMaterial(650, 500, 1000, 500, [])
                        testMaterial(650, 500, 650, 1000, [])
                })
                it('min- of SMG', () => {
                        testMaterial(29, 500, 500, 500, [])
                        testMaterial(500, 29, 500, 500, [])
                        testMaterial(500, 500, 29, 500, [])
                        testMaterial(500, 500, 500, 29, [])
                })
                it('max+ of SMG', () => {
                        testMaterial(1000, 500, 500, 500, [])
                        testMaterial(500, 1000, 500, 500, [])
                        testMaterial(500, 500, 1000, 500, [])
                        testMaterial(500, 500, 500, 1000, [])
                })
        })
})

/* here start the decision table testing */
describe('DTT decision table testing', () => {
        // 3 * 3 * 3 * 2 * 3 = 162 possible branch. 0.0
        // just 5 type of result.
        describe('decision table normal', () => {
                        it('common max + 1 of 5 gunType, all fail, None', () => {
                                testMaterial(1000, 1000, 1000, 1000, [])
                        })
                        it('common max - 1 and min + 1 of 5 gunType, cut HG', () => {
                                testMaterial(998, 998, 998, 998, ['AR', 'MG', 'RF', 'SMG'])
                                testMaterial(401, 601, 401, 301, ['AR', 'MG', 'RF', 'SMG'])
                        })
                        it('max-1 components of RF, cut RF', () => {
                                testMaterial(998, 998, 299, 998, ['AR', 'MG', 'SMG'])
                                testMaterial(401, 601, 299, 301, ['AR', 'MG', 'SMG'])
                        })
                        it('max-1 ammunition of MG, cut MG', () => {
                                testMaterial(998, 599, 299, 998, ['AR', 'SMG'])
                                testMaterial(401, 599, 299, 301, ['AR', 'SMG'])
                        })
                        it('max + 1 all >=800, add HG', () => {
                                testMaterial(401, 49, 49, 301, ['AR', 'HG', 'SMG'])
                        })
                        it('max - 1 all < 800, cut AR', () => {
                                testMaterial(401, 48, 48, 301, ['HG', 'SMG'])
                        })
                        it('min + 1 human resource, ammunition, components of SMG, just HG and SMG', () => {
                                testMaterial(31, 31, 31, 301, ['HG', 'SMG'])
                        })
                        it('min + 1 components, just HG and SMG', () => {
                                testMaterial(31, 31, 31, 31, ['HG', 'SMG'])
                        })
                        it('common min - 1 of 5 gunType, all fail, None', () => {
                                testMaterial(29, 29, 29, 29, [])
                        })
                })
                /*
                 H = HumanResources, M = Ammuntion, R = Rations, C = Components, A = ALL.
                 5 correct rules(road) for 5 gunType.
                 Rule 1: AR
                      H > 30 && H < 999 && M > 400 && M < 999 && R > 400 && R < 999 && C > 30 && C < 999.
                 Rule 2: HG
                      H > 30 && H < 830 && M > 30  && M < 830 && R > 30  && R < 830 && C > 30 && C < 830.
                 Rule 3: MG
                      H > 400 && H < 999 &&  M > 600 && M < 999 && R > 30 && R < 999 && C > 300 && C < 999.
                 Rule 4: RF
                      H > 300 && H < 999 && M > 30 && M < 999 && R > 30 && R < 999 && C > 30 && C < 999.
                 Rule 5: SMG
                      H > 30 && H < 999 && M > 30 && M < 999 && R > 30 && R < 999 && C > 30 && C < 999.
                 Rules for All:
                 Rule 6: A > 800 => AR
                 Rule 7: A > 660 => MG, RF
                 Rule 8: A > 120 && A < 830 => HG.
                 Rule 9: A > 120 => SMG.
                 Rule 10: A > 3996 || A < 120 => None.

                 merge the rules 1 - 10.
                */
})      
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
	state = gunType(state, { type: 'ONCHANGE', kind: 'HR', amount: HR });
	state = gunType(state, { type: 'ONCHANGE', kind: 'AMMU', amount: AMMU });
	state = gunType(state, { type: 'ONCHANGE', kind: 'RA', amount: RA });
	state = gunType(state, { type: 'ONCHANGE', kind: 'PART', amount: PART });
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
		it('AR', () => { testMaterial(500, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG']) })
		it('HG', () => { testMaterial(230, 230, 230, 230, ['AR', 'HG', 'SMG']) })
		it('MG', () => { testMaterial(700, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG']) })
		it('RF', () => { testMaterial(650, 500, 650, 500, ['AR', 'RF', 'SMG']) })
		it('SMG', () => { testMaterial(500, 500, 500, 500, ['AR', 'RF', 'SMG']) })
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

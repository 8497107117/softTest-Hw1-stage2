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
		it('HG', () => { testMaterial(130, 130, 130, 130, ['HG', 'SMG']) })
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

describe('edge testing', () => {
	describe('normal', () => {
		it('min of AR', ()=> {
			testMaterial(30, 700, 700, 500, ['AR', 'SMG'])
			testMaterial(500, 400, 700, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 700, 400, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 700, 30, ['AR', 'RF', 'SMG'])
		})
		it('min+ of AR', ()=> {
			testMaterial(31, 700, 700, 500, ['AR', 'SMG'])
			testMaterial(500, 401, 700, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 700, 401, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 700, 31, ['AR', 'RF', 'SMG'])
		})
		it('normal- of AR', ()=> {
			testMaterial(499, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 699, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 699, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 700, 499, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('normal of AR', ()=> {
			testMaterial(500, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('normal+ of AR', ()=> {
			testMaterial(501, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 701, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 701, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 700, 501, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('max- of AR', ()=> {
			testMaterial(998, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 998, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 998, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 700, 998, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('max of AR', ()=> {
			testMaterial(999, 700, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 999, 700, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 999, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 700, 999, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('min of HG', ()=> {
			testMaterial(30, 130, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 30, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 30, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 130, 30, ['HG', 'SMG'])
		})
		it('min+ of HG', ()=> {
			testMaterial(31, 130, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 31, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 31, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 130, 31, ['HG', 'SMG'])
		})
		it('normal- of HG', ()=> {
			testMaterial(129, 130, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 129, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 129, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 130, 129, ['HG', 'SMG'])
		})
		it('normal of HG', ()=> {
			testMaterial(130, 130, 130, 130, ['HG', 'SMG'])
		})
		it('normal+ of HG', ()=> {
			testMaterial(131, 130, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 131, 130, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 131, 130, ['HG', 'SMG'])
			testMaterial(130, 130, 130, 131, ['HG', 'SMG'])
		})
		it('max- of HG', ()=> {
			testMaterial(829, 130, 130, 130, ['AR', 'SMG'])
			testMaterial(130, 829, 130, 130, ['AR', 'SMG'])
			testMaterial(130, 130, 829, 130, ['AR', 'SMG'])
			testMaterial(130, 130, 130, 829, ['AR', 'SMG'])
		})
		it('max of HG', ()=> {
			testMaterial(830, 130, 130, 130, ['AR', 'SMG'])
			testMaterial(130, 830, 130, 130, ['AR', 'SMG'])
			testMaterial(130, 130, 830, 130, ['AR', 'SMG'])
			testMaterial(130, 130, 130, 830, ['AR', 'SMG'])
		})
		it('min of MG', ()=> {
			testMaterial(400, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 600, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 30, 650, ['AR', 'MG', 'SMG'])
			testMaterial(700, 800, 500, 300, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('min+ of MG', ()=> {
			testMaterial(401, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 601, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 31, 650, ['AR', 'MG', 'SMG'])
			testMaterial(700, 800, 500, 301, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('normal- of MG', ()=> {
			testMaterial(699, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 799, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 499, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 500, 649, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('normal of MG', ()=> {
			testMaterial(700, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('normal+ of MG', ()=> {
			testMaterial(701, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 801, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 501, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 500, 651, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('max- of MG', ()=> {
			testMaterial(998, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 998, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 998, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 500, 998, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('max of MG', ()=> {
			testMaterial(999, 800, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 999, 500, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 999, 650, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(700, 800, 500, 999, ['AR', 'MG', 'RF', 'SMG'])
		})
		it('min of RF', ()=> {
			testMaterial(300, 500, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 30, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 300, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 650, 30, ['AR', 'RF', 'SMG'])
		})
		it('min+ of RF', ()=> {
			testMaterial(301, 500, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 31, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 301, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 650, 31, ['AR', 'RF', 'SMG'])
		})
		it('normal- of RF', ()=> {
			testMaterial(649, 500, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 499, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 649, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 650, 499, ['AR', 'RF', 'SMG'])
		})
		it('normal of RF', ()=> {
			testMaterial(650, 500, 650, 500, ['AR', 'RF', 'SMG'])
		})
		it('normal+ of RF', ()=> {
			testMaterial(651, 500, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 501, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 651, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 650, 501, ['AR', 'RF', 'SMG'])
		})
		it('max- of RF', ()=> {
			testMaterial(998, 500, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 998, 650, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(650, 500, 998, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 650, 998, ['AR', 'RF', 'SMG'])
		})
		it('max of RF', ()=> {
			testMaterial(999, 500, 650, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 999, 650, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(650, 500, 999, 500, ['AR', 'RF', 'SMG'])
			testMaterial(650, 500, 650, 999, ['AR', 'RF', 'SMG'])
		})
		it('min of SMG', ()=> {
			testMaterial(30, 500, 500, 500, ['AR', 'SMG'])
			testMaterial(500, 30, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 30, 500, ['AR', 'SMG'])
			testMaterial(500, 500, 500, 30, ['AR', 'RF', 'SMG'])
		})
		it('min+ of SMG', ()=> {
			testMaterial(31, 500, 500, 500, ['AR', 'SMG'])
			testMaterial(500, 31, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 31, 500, ['AR', 'SMG'])
			testMaterial(500, 500, 500, 31, ['AR', 'RF', 'SMG'])
		})
		it('normal- of SMG', ()=> {
			testMaterial(499, 500, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 499, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 499, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 500, 499, ['AR', 'RF', 'SMG'])
		})
		it('normal of SMG', ()=> {
			testMaterial(500, 500, 500, 500, ['AR', 'RF', 'SMG'])
		})
		it('normal+ of SMG', ()=> {
			testMaterial(501, 500, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 501, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 501, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 500, 501, ['AR', 'RF', 'SMG'])
		})
		it('max- of SMG', ()=> {
			testMaterial(998, 500, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 998, 500, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 500, 998, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 500, 998, ['AR', 'RF', 'SMG'])
		})
		it('max of SMG', ()=> {
			testMaterial(999, 500, 500, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 999, 500, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 500, 999, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 500, 500, 999, ['AR', 'RF', 'SMG'])
		})
	})
	describe('robust', () => {
		it('min- of AR', ()=> {
			testMaterial(29, 700, 700, 500, [])
			testMaterial(500, 399, 700, 500, ['AR', 'RF', 'SMG'])
			testMaterial(500, 700, 399, 500, ['AR', 'MG', 'RF', 'SMG'])
			testMaterial(500, 700, 700, 29, [])
		})
		it('max+ of AR', ()=> {
			testMaterial(1000, 700, 700, 500, [])
			testMaterial(500, 1000, 700, 500, [])
			testMaterial(500, 700, 1000, 500, [])
			testMaterial(500, 700, 700, 1000, [])
		})
		it('min- of HG', ()=> {
			testMaterial(29, 230, 230, 230, [])
			testMaterial(230, 29, 230, 230, [])
			testMaterial(230, 230, 29, 230, [])
			testMaterial(230, 230, 230, 29, [])
		})
		it('max+ of HG', ()=> {
			testMaterial(831, 230, 230, 230, ['AR', 'SMG'])
			testMaterial(230, 831, 230, 230, ['AR', 'SMG'])
			testMaterial(230, 230, 831, 230, ['AR', 'SMG'])
			testMaterial(230, 230, 230, 831, ['AR', 'SMG'])
		})
		it('min- of MG', ()=> {
			testMaterial(399, 800, 500, 650, ['AR', 'RF', 'SMG'])
			testMaterial(700, 599, 500, 650, ['AR', 'RF', 'SMG'])
			testMaterial(700, 800, 29, 650, [])
			testMaterial(700, 800, 500, 299, ['AR', 'RF', 'SMG'])
		})
		it('max+ of MG', ()=> {
			testMaterial(1000, 800, 500, 650, [])
			testMaterial(700, 1000, 500, 650, [])
			testMaterial(700, 800, 1000, 650, [])
			testMaterial(700, 800, 500, 1000, [])
		})
		it('min- of RF', ()=> {
			testMaterial(299, 500, 650, 500, ['AR', 'SMG'])
			testMaterial(650, 29, 650, 500, [])
			testMaterial(650, 500, 299, 500, ['AR', 'SMG'])
			testMaterial(650, 500, 650, 29, [])
		})
		it('max+ of RF', ()=> {
			testMaterial(1000, 500, 650, 500, [])
			testMaterial(650, 1000, 650, 500, [])
			testMaterial(650, 500, 1000, 500, [])
			testMaterial(650, 500, 650, 1000, [])
		})
		it('min- of SMG', ()=> {
			testMaterial(29, 500, 500, 500, [])
			testMaterial(500, 29, 500, 500, [])
			testMaterial(500, 500, 29, 500, [])
			testMaterial(500, 500, 500, 29, [])
		})
		it('max+ of SMG', ()=> {
			testMaterial(1000, 500, 500, 500, [])
			testMaterial(500, 1000, 500, 500, [])
			testMaterial(500, 500, 1000, 500, [])
			testMaterial(500, 500, 500, 1000, [])
		})
	})
})


/* here start the decision table testing */
describe('DTT', () => {
        // Orz
})

import React from 'react';
import InputField from './InputField';
import store from '../store/store';

const GunType = ({ types }) => {
	return (
		<div>
			<form className="modal-form animate">
				<InputField id="human-resources" label="人力" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
                            store.dispatch({kind: 'HR', type: 'ONCHANGE', amount: e.target.value});
						}
					}
				/>
				<InputField id="ammunition" label="彈藥" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
                            store.dispatch({kind: 'AMMU', type: 'ONCHANGE', amount: e.target.value});
						}
					}
				/>
				<InputField id="rations" label="口糧" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
                            store.dispatch({kind: 'RA', type: 'ONCHANGE', amount: e.target.value});
						}
					}
				/>
				<InputField id="components" label="零件" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
                            store.dispatch({kind: 'PART', type: 'ONCHANGE', amount: e.target.value});
						}
					}
				/>
				<div>
					<button onClick={e => { e.preventDefault(); }}>確認</button>
					<button onClick={e => { e.preventDefault(); }}>重置</button>
				</div>
			</form>
			<div>{types.map((type, index)=>(<div key={index}>{type}</div>))}</div>
		</div>
	);
};

export default GunType;

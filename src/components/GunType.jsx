import React from 'react';
import InputField from './InputField';

const GunType = ({ types }) => {
	return (
		<div>
			<form className="modal-form animate">
				<InputField id="human-resources" label="人力" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
						}
					}
				/>
				<InputField id="ammunition" label="彈藥" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
						}
					}
				/>
				<InputField id="rations" label="口糧" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
						}
					}
				/>
				<InputField id="components" label="零件" type="number" min="30" max="999" defaultValue="30"
					onChange={
						e => {
							e.preventDefault();
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
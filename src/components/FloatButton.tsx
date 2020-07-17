import React from 'react';
import classNames from 'classnames';

interface PropTypes {
	onClick: (event: React.MouseEvent) => void;
	disabled?: boolean;
}

const FloatButton: React.FC<PropTypes> = (props) => {
	const { children, onClick, disabled = false } = props;

	const playerClassName = classNames(
		'rounded-full p-2 w-full block border border-black',
		{
			'bg-gray-400': disabled,
			'bg-blue-300': !disabled,
		},
	);

	return (
		<button className={playerClassName} onClick={onClick}>
			{children}
		</button>
	);
};

export default FloatButton;

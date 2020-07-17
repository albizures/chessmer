import React from 'react';
import classNames from 'classnames';

export enum PlayerType {
	Player1,
	Player2,
}

interface PropTypes {
	type: PlayerType;
	time: number;
	disabled: boolean;
	onTurnDone: (event: React.MouseEvent) => void;
}

const zeroPad = (value: number) => {
	if (value < 10) {
		return `0${value}`;
	}

	return String(value);
};

const getTimeParts = (time: number) => {
	const seconds = time / 1000;
	const minutes = Math.floor(seconds / 60);

	return {
		minutes: minutes,
		seconds: seconds - minutes * 60,
	};
};

const PlayerButton: React.FC<PropTypes> = (props) => {
	const { time, type, disabled, onTurnDone } = props;
	const playerClassName = classNames('text-6xl flex-1', {
		'opacity-50 bg-gray-400': disabled,
		upsidedown: type === PlayerType.Player1,
	});

	const { minutes, seconds } = getTimeParts(time);

	return (
		<button
			disabled={disabled}
			onClick={onTurnDone}
			className={playerClassName}
		>
			{zeroPad(minutes)}:{zeroPad(seconds)}
		</button>
	);
};

export default PlayerButton;

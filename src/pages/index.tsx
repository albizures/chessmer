import React from 'react';
import NextHead from 'next/head';
import { RecoilRoot, useRecoilState } from 'recoil';
import PlayerButton, { PlayerType } from '../components/PlayerButton';
import FloatButton from '../components/FloatButton';
import {
	stateAtom,
	timerPlayer1,
	timerPlayer2,
	States,
	defaultTime,
	stateBeforePause,
} from '../atoms';

type Setter = (next: (value: number) => number) => void;

const createTimer = (setter: Setter) => {
	const timer = setInterval(() => {
		setter((value) => value - 1000);
	}, 1000);
	return () => {
		clearInterval(timer);
	};
};

const add1Minute = (value: number) => value + 60_000;
const remove1Minute = (value: number) => value - 60_000;

const Index: React.FC = () => {
	const [state, setState] = useRecoilState(stateAtom);
	const [timer1, setTimer1] = useRecoilState(timerPlayer1);
	const [timer2, setTimer2] = useRecoilState(timerPlayer2);
	const [beforePause, setBeforePause] = useRecoilState(stateBeforePause);

	React.useEffect(() => {
		if (state === States.Idle || state === States.Paused) {
			return;
		}

		return createTimer(state === States.Player1 ? setTimer1 : setTimer2);
	}, [state]);

	const onTurnDone = () => {
		if (state === States.Player1) {
			setState(States.Player2);
		}

		if (state === States.Player2) {
			setState(States.Player1);
		}
	};

	const onAdd = () => {
		setTimer1(add1Minute);
		setTimer2(add1Minute);
	};

	const onRemove = () => {
		setTimer1(remove1Minute);
		setTimer2(remove1Minute);
	};

	const onStart = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (state === States.Paused) {
			return setState(beforePause);
		}

		setState(States.Player1);
	};

	const onPause = () => {
		setBeforePause(state);
		setState(States.Paused);
	};

	const onReset = () => {
		setTimer1(defaultTime);
		setTimer2(defaultTime);
		setState(States.Idle);
	};

	const paused = state === States.Paused;

	return (
		<div className="container flex content-center flex-col justify-center h-screen">
			<NextHead>
				<title>Chessmer</title>
			</NextHead>
			<PlayerButton
				onTurnDone={onTurnDone}
				disabled={paused || state === States.Player2}
				type={PlayerType.Player1}
				time={timer1}
			/>
			<div className="px-4 flex space-x-4 content-center items-stretch absolute w-full  z-10">
				<FloatButton onClick={onAdd}>+</FloatButton>
				<FloatButton disabled={state === States.Idle} onClick={onReset}>
					⏹
				</FloatButton>
				{state === States.Paused || state === States.Idle ? (
					<FloatButton onClick={onStart}>▶</FloatButton>
				) : (
					<FloatButton onClick={onPause}>⏸</FloatButton>
				)}
				<FloatButton onClick={onRemove}>-</FloatButton>
			</div>
			<PlayerButton
				onTurnDone={onTurnDone}
				disabled={paused || state === States.Player1}
				type={PlayerType.Player2}
				time={timer2}
			/>
		</div>
	);
};

const Root: React.FC = () => {
	return (
		<RecoilRoot>
			<Index />
		</RecoilRoot>
	);
};

export default Root;

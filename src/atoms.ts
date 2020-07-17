import { atom } from 'recoil';

const defaultTime = 5 * 60 * 1000;

const timerPlayer1 = atom({
	key: 'timer-player-1',
	default: defaultTime,
});

const timerPlayer2 = atom({
	key: 'timer-player-2',
	default: defaultTime,
});

export enum States {
	Idle,
	Player1,
	Player2,
	Paused,
}

const stateAtom = atom({
	key: 'state',
	default: States.Idle,
});

const stateBeforePause = atom({
	key: 'before-pause',
	default: States.Idle,
});

export { timerPlayer1, timerPlayer2, stateAtom, stateBeforePause, defaultTime };

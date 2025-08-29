// Error
export class Left<L> {
	readonly value: L;

	constructor(value: L) {
		this.value = value;
	}
}

// Success
export class Right<R> {
	readonly value: R;

	constructor(value: R) {
		this.value = value;
	}
}

type Either<L, R> = Left<L> | Right<R>;

export const right = <L, R>(value: R): Either<L, R> => {
	return new Right(value);
};

export const left = <L, R>(value: L): Either<L, R> => {
	return new Left(value);
};

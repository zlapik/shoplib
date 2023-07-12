import { Complex } from "@prokopschield/complex";

export class RPSN {
	protected _rate: Complex;

	constructor(rpsn: bigint | number | string | Complex) {
		this._rate = Complex.eval(String(rpsn));

		if (this._rate.real > 1) {
			this._rate = this._rate.div(100);
		}

		if (this._rate.imag || this._rate.real < 0 || this._rate.real > 1) {
			throw new Error(`Invalid interest rate: ${rpsn}`);
		}
	}

	valueOf() {
		return this._rate.abs;
	}

	toString() {
		return this._rate.toPercentage();
	}

	perDay() {
		return this._rate
			.add(1)
			.pow(1 / 365)
			.sub(1)
			.toPercentage();
	}

	static fromDaily(per_diem: bigint | number | string | Complex) {
		let rate = Complex.eval(String(per_diem));

		if (rate.real > 1) {
			rate = rate.div(100);
		}

		return new RPSN(rate.add(1).pow(365).sub(1).toPercentage());
	}

	perWeek() {
		return this._rate
			.add(1)
			.pow(1 / 52)
			.sub(1)
			.toPercentage();
	}

	static fromWeekly(per_hebdomadam: bigint | number | string | Complex) {
		let rate = Complex.eval(String(per_hebdomadam));

		if (rate.real > 1) {
			rate = rate.div(100);
		}

		return new RPSN(rate.add(1).pow(52).sub(1).toPercentage());
	}

	perMonth() {
		return this._rate
			.add(1)
			.pow(1 / 12)
			.sub(1)
			.toPercentage();
	}

	static fromMonthly(per_mensem: bigint | number | string | Complex) {
		let rate = Complex.eval(String(per_mensem));

		if (rate.real > 1) {
			rate = rate.div(100);
		}

		return new RPSN(rate.add(1).pow(12).sub(1).toPercentage());
	}

	perYear() {
		return this._rate.toPercentage();
	}

	static fromYearly(per_annos: bigint | number | string | Complex) {
		let rate = Complex.eval(String(per_annos));

		if (rate.real > 1) {
			rate = rate.div(100);
		}

		return new RPSN(rate.toPercentage());
	}
}

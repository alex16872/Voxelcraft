export class Vector3 {
	constructor (x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	set (x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	}
	copy ({x = 0, y = 0, z = 0}) {
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	}
	clone () {
		return new Vector3(this.x, this.y, this.z);
	}
	add ({x = 0, y = 0, z = 0}) {
		this.x += x;
		this.y += y;
		this.z += z;

		return this;
	}
	sub ({x = 0, y = 0, z = 0}) {
		this.x -= x;
		this.y -= y;
		this.z -= z;

		return this;
	}
	multiply (s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;

		return this;
	}
	divide (s) {
		const d = 1 / s;

		this.x *= d;
		this.y *= d;
		this.z *= d;

		return this;
	}
	normalise () {
		const d = 1 / this.length();

		this.x *= d;
		this.y *= d;
		this.z *= d;

		return this;
	}
	applyQuaternion ({x = 0, y = 0, z = 0, w = 1}) {
		// calculate quat * vector

		const ix = w * this.x + y * this.z - z * this.y;
		const iy = w * this.y + z * this.x - x * this.z;
		const iz = w * this.z + x * this.y - y * this.x;
		const iw = - x * this.x - y * this.y - z * this.z;

		// calculate result * inverse quat

		this.x = ix * w + iw * - x + iy * - z - iz * - y;
		this.y = iy * w + iw * - y + iz * - x - ix * - z;
		this.z = iz * w + iw * - z + ix * - y - iy * - x;

		return this;

	}
	lerp (v, s) {
		this.x += (v.x - this.x) * s;
		this.y += (v.y - this.y) * s;
		this.z += (v.z - this.z) * s;

		return this;
	}
	length () {
		return Math.sqrt(this.x **2 + this.y ** 2 + this.z ** 2);
	}
	lengthSq () {
		return this.x **2 + this.y ** 2 + this.z ** 2;
	}
	floor () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);

		return this;
	}
}

Vector3.UP = new Vector3(0, 1, 0);

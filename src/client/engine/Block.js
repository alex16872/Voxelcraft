import { Vector3 } from "../math/Vector3.js";
import { getTextureCoords, createAtlas } from "./loadTexture.js";

const register = new Map();

export class Block {
	constructor (id, name, opaque) {
		this.id = id;
		this.name = name;
		this.opaque = opaque;
		this.textures = {
			top: getTextureCoords("default"),
			bottom: getTextureCoords("default"),
			left: getTextureCoords("default"),
			right: getTextureCoords("default"),
			front: getTextureCoords("default"),
			back: getTextureCoords("default")
		};

		register.set(id, this);
	}
	setAllTextures (src) {
		const coords = getTextureCoords(src);
		this.textures["top"] = coords;
		this.textures["bottom"] = coords;
		this.textures["left"] = coords;
		this.textures["right"] = coords;
		this.textures["front"] = coords;
		this.textures["back"] = coords;
	}
	setTexture (side, src) {
		if (!src)
			console.warn(`${this.name} is missing texture ${side}`);
		this.textures[side] = getTextureCoords(src);
	}
	getTexture (side) {
		if (!this.textures[side])
			console.warn(`${this.name} is missing texture ${side}`);
		return this.textures[side];
	}
	instance () {
		return this;
	}
	destroy (n) {

	}
	static get (id) {
		return register.get(id);
	}
	static async parseDefinitions (gl, src) {
		const response = await fetch(src);
		const definitions = await response.json();

		const textures = [];
		const callbacks = [];

		const setTexture = (block, side, src) => {
			if (src)
				textures.push(src);
			callbacks.push(() => block.setTexture(side, src));
		};

		for (const def of definitions) {
			const {
				id,
				name,
				opaque,
				texture,
				side = texture,
				front = side,
				back = side,
				left = side,
				right = side,
				top = texture,
				bottom = top
			} = def;

			if (opaque && !(top && bottom && left && right && front && back))
				throw new Error("Undefined texture for block");

			const block = new Block(id, name, opaque);
			setTexture(block, "top", top);
			setTexture(block, "bottom", bottom);
			setTexture(block, "left", left);
			setTexture(block, "right", right);
			setTexture(block, "front", front);
			setTexture(block, "back", back);
		}

		const atlas = await createAtlas(gl, textures, 32);

		callbacks.forEach(fn => fn());

		return atlas;
	}
}

Block.FRONT = [
	new Vector3(0, 0, 1),
	new Vector3(1, 0, 1),
	new Vector3(1, 1, 1),
	new Vector3(0, 1, 1),
];
Block.BACK = [
	new Vector3(0, 0, 0),
	new Vector3(0, 1, 0),
	new Vector3(1, 1, 0),
	new Vector3(1, 0, 0),
];
Block.TOP = [
	new Vector3(0, 1, 0),
	new Vector3(0, 1, 1),
	new Vector3(1, 1, 1),
	new Vector3(1, 1, 0),
];
Block.BOTTOM = [
	new Vector3(0, 0, 0),
	new Vector3(1, 0, 0),
	new Vector3(1, 0, 1),
	new Vector3(0, 0, 1),
];
Block.RIGHT = [
	new Vector3(1, 0, 0),
	new Vector3(1, 1, 0),
	new Vector3(1, 1, 1),
	new Vector3(1, 0, 1),
];
Block.LEFT = [
	new Vector3(0, 0, 0),
	new Vector3(0, 0, 1),
	new Vector3(0, 1, 1),
	new Vector3(0, 1, 0)
];

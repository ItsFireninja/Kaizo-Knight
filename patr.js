// custom component controlling enemy patrol movement
export default function patr(speed = 120, dir = 1) {
	return {
		id: "patr",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, side) => {
				if (side === "left" || side === "right") {
					dir = -dir;
				}
			});
		},
		update() {
			this.move(speed * dir, 0);
		},
	};
}

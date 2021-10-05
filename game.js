class Game {
  constructor(io) {
    this.io = io;
    this.connected_players = {};
  }

  listen() {
    let index = 0;
    this.io.on("connection", socket => {
      let id = ++index;
      let player = new Player(id);
      this.connected_players[id] = player;
      socket.on("moveLeft", () => {
        player.moveLeft();
      })
      socket.on("moveRight", () => {
        player.moveRight();
      })
      socket.on("moveUp", () => {
        player.moveUp();
      })
      socket.on("moveDown", () => {
        player.moveDown();
      })
      socket.on("disconnect", () => {
        delete this.connected_players[id];
      })
    });

    setInterval(() => {
      this.io.emit("state", { 
        "players": Object.values(this.connected_players)
      });
    }, 15)
  }
}

module.exports = io => new Game(io);

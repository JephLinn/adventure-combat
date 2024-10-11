const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    let item = this.currentRoom.getItemByName(itemName);
        let i = this.currentRoom.items.indexOf(item);
        this.items.push(item);
        this.currentRoom.items.splice(i)

  }

  dropItem(itemName) {

    let item = this.getItemByName(itemName);
        let i = this.items.indexOf(item);
        this.items.splice(i);
        this.currentRoom.items.push(item)

  }

  eatItem(itemName) {

    let item = this.getItemByName(itemName);
        if (item instanceof Food) {
            let i = this.items.indexOf(item);
            this.items.splice(i)
        }


  }

  getItemByName(name) {

    for (let item of this.items) {
        if (item.name === name) {
            return item
        }
    }
}

  hit(name) {

    // Fill this in

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};

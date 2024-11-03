const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super (name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    let exits = this.currentRoom.getExits();
    let randomExit = exits[Math.floor(Math.random() * exits.length)];
    let nextRoom = this.currentRoom.getRoomInDirection(randomExit);
    this.currentRoom = nextRoom;

    this.cooldown += 1000;
    this.act;
    this.attackTarget = null;
  }

  takeSandwich() {
    let food = this.currentRoom.getItemByName(sandwich)

    if (food) {
      this.takeItem(food)
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    this.attackTarget = this.player;
    this.attackTarget.applyDamage(this.strength);
    this.cooldown += 3000;
    this.act;
  }

  applyDamage(amount) {
    this.health -= amount;
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    setTimeout(() => this.scratchNose, 3000);
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};

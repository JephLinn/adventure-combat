class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10;

  }

  applyDamage(amount) {
    this.health -= amount
    
    if (this.health <= 0) {
      this.die();
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

  getItemByName(name) {

    for (let item of this.items) {
        if (item.name === name) {
            return item
        }
    }
}

die() {
  for (let item in this.items) {
    this.dropItem(this.items[item].name);
  }
  this.currentRoom = null;

}

}

module.exports = {
  Character,
};

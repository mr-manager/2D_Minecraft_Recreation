class Tool {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.tilesArray = [];
    this.isActive = true;
  }
  getActiveState() {
    return this.isActive;
  }
  setActiveState(activeState) {
    if (typeof activeState == "boolean") {
      this.isActive = activeState;
    }
  }
  canOperateTool(tile) {
    if (tile.getEmptyState()) {
      rejectEffect();
      return false;
    } else {
      // tile is not empty
      return true;
    }
  }
  harvestTile(tile) {
    this.tilesArray.push(tile.type);
    // set tile type to empty
    tile.setType("");
    tile.setEmptyState(true);
  }
}

class Inventory extends Tool {
  constructor() {
    super("inventory","inventory");
  }
  canPlaceTile(tile) {
    //will return true if tile is empty
    return tile.getEmptyState();
  }
  placeTile(tile, type) {
    tile.setType(type);
    tile.setEmptyState(false);
  }
}

class Shovel extends Tool {
  constructor() {
    super("shovel", "ground");
  }
  canDig(tile) {
    // check if tile is not empty &  if tool can operate on tile
    if (
      this.canOperateTool(tile) &&
      (tile.type === "ground" || tile.type === "grass")
    ) {
      // tile matches tool type
      this.harvestTile(tile);
      return true;
    } else {
      // can't dig here
      rejectEffect();
    }
  }
}

class Axe extends Tool {
  constructor() {
    super("axe", "tree");
  }
  canChop(tile) {
    // check if tile is not empty &  if tool can operate on tile
    if (
      this.canOperateTool(tile) &&
      (tile.type === "tree" || tile.type === "wood")
    ) {
      // tile matches tool type
      this.harvestTile(tile);
      return true;
    } else {
      // can't chop
      rejectEffect();
    }
  }
}

class pickAxe extends Tool {
  constructor() {
    super("pickaxe", "rock");
  }
  canMine(tile) {
    // check if tile is not empty &  if tool can operate on tile
    if (this.canOperateTool(tile) && tile.type === "rock") {
      // tile matches tool type
      this.harvestTile(tile);
      return true;
    } else {
      // can't mine
      rejectEffect();
    }
  }
}

function rejectEffect() {
  error.play();
}

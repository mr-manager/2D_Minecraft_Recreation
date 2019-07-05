class Tile {
  constructor(type, isEmpty) {
    // basic tile properties setup
    this.type = type || ""; 
    this.isEmpty = isEmpty; 
  }
  // tile functionality
  // Empty state getter and setter
  getEmptyState() {
    return this.isEmpty;
  }
  setEmptyState(isEmpty) {
    if (typeof isEmpty == "boolean") {
      this.isEmpty = isEmpty;
    }
  }
  // Tile type adder and setter
  getType() {
    return this.type;
  }
  setType(newType) {
    this.type = newType;
  }
}

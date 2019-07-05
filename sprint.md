


## Thoughts about workflow
- A tool object operates on a tile object.
- The board object holds all the game elements and logic.
- On startup the board reads all tile DOM elements and creates corresponding tile objects in a 2D array.
- The board attaches click elements to the tile DOM elements
- The board also reads any other elements – such as tools – and stores them in corresponding objects as well – the objects are members of the board object.
- A tile div is not clickable except in case a tool was clicked first.
- When a tile is clicked the board checks for a tool-tile match using the tool methods.
- If there’s a match the board operates the tool’s tile modification methods on the tile object and corresponding DOM element.

## General preface
1. Let's try and discuss design issues (mostly classes, interactions, extreme artistic choices)
2. Let's try and comment our code whenever it seems helpful - we can always remove the comments later

## Stories preface
1. Stories describe in words what to do - not how to code it.
2. Stories should be as specific and granular as possible.
3. The order of stories is not necessarily indicative of implementation order.
4. Most stories are just thoughts and suggestions.
5. When choosing to implement a story - create a Trello card at the right list.
6. Break down stories into sub stories per function / other small units.
7. Commit often, pull before you push.
8. Try to be as modular as possible - e.g. see if you can implement your feature  in a separate file for a class, a collection of css classes, separate resources into reasonable folders etc.
   1. This should also help deal with conflicts

### Common stories
Game logic stories
1. (Write tile-tool interaction stories)
2. (Write user interaction stories)
3. (Write game flow stories)

Game features stories
1. Add save/load game

Special effects stories (final touches)
1. Add css mid states and animations
   1. e.g. a tile type should have mid states
      1. full 
      2. half full
      3. empty
   2. e.g. a tool should have "animation" - simulating activity (a shovel is shoveling)
2. Add audio effects for tools, interactions
   1. e.g. shoveling sound
   2. e.g. add tile from inventory sound


### Elroi's stories
Tile stories
1. tile should have getters and setters for all properties
   1. add getter and setter for isEmpty - DONE
   2. add getter and setter for tile type - DONE
2. (Geek Out) Add more tiles

Game  stories:
1. Tool buttons: 
   1. Add click listeners - DONE
   2. Create new tool object on click - DONE
   3. Change cursor on click - BUG
2. Tile buttons:
   1. Add click listeners - DONE
   2. Create a new Tile object on click - DONE
3. Tile - tool connection - DONE

Board stories
1. The board class represents the board tiles collection object.
2. It should hold a 2D array of Tile objects.
   1. Tile position in the tiles array corresponds to the respective div position in the div's row/column position.
3. The tile objects' properties should be obtained from the corresponding divs.
4. A setup method should obtain all of the divs' relevant properties and create the tiles array.
5. Game logic and tool-tile interactions could be defined in the Board.


### Jonas' stories
Tool stories
1. Add full Shovel tool functionality. -DONE
2. Move general functionality from Shovel to the Tool class. -DONE
3. Rinse and repeat -DONE
4. Add additional tools (each with their own stories and sub stories)
   1. Axe -DONE
   2. Pickaxe -DONE
   3. Inventory extractor (a tool that takes a tile from the inventory and places it) -DONE
5. (Geek Out) "Add the ability to remember more than the last tile clicked (maintain the user’s inventory)" -sort of done
6. (Geek Out) "Add more tools"
7. 

### Motty's stories
CSS stories
1. (Geek Out) "Add fade-in/out effect when adding/removing tiles"
2. (Geek Out) "Add themes (changing a theme should change the world’s textures)"
3. Add seizure-mode

HTML stories
2. "You should create a landing page with a tutorial explaining the game." - done
3. (Geek Out) "Make it responsive" - done
4. (Geek Out) "Allow the user to set the world width and height"




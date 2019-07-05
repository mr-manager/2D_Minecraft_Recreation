$(document).ready(() => {
  // Globals
  let activeToolType = ""; //= "shovel";
  let altTileType = "";
  let activeTileType = ""; //= "dirt";
  let activeTool; //= new Shovel();
  let activeTile; //= new Tile("",false);
  // Modal
  // Modal buttons
  let howToButton = $("#how-to");
  let newGameButton = $("#new-game");
  let themeButton = $("#theme");
  // toggleTheme
  $(themeButton).on("click", () => {
    toggleTheme();
  });
  $(newGameButton).on("click", () => {
    $("#modal-wrapper").toggle();
  });
  $(howToButton).on("click", () => {
    $(".modal-content").toggle();
  });
  //
  //Sounds
  let error = new Audio();
  error.src = "./sounds/error-alert.wav";
  let toolSelect = new Audio();
  toolSelect.src = "./sounds/tool-select.wav";
  let toolSound = new Audio();
  let setResource = new Audio();
  setResource.src = "./sounds/tile-place.mp3";
  // Tiles
  let tiles = $(".tile");
  Array.from(tiles).forEach(t => {
    $(t).on("mousedown", () => {
      //
      // Check for active tool
      if (activeToolType !== "") {
        // Set tile object
        let tileType = t.className.replace("tile", "").trim();
        // Exception for multi class elements
        if (tileType == "wood") {
          altTileType = "tree";
        } else if (tileType == "dirt" || tileType == "grass") {
          altTileType = "ground";
        } else {
          altTileType = "";
        }
        let isEmpty = tileType.length == 0;
        activeTile = new Tile(tileType, isEmpty);

        // Check for tile tool match
        if (
          activeTool.type == activeTile.type ||
          activeTool.type == altTileType
          // activeTool.canOperateTool(activeTile)
        ) {
          // modify inventory counter
          let counterValue = parseInt($("#" + tileType).text());
          counterValue++;
          // set counter value
          $("#" + tileType).text(counterValue);
          $("#" + tileType).css("pointer-events", "auto");
          $("#" + tileType).css("opacity", 1);

          //audio
          toolSound.src = `./sounds/${activeTool.name}.mp3`;
          toolSound.play();
          // Operate tool
          activeTool.harvestTile(activeTile);
          //
          // Update tile to empty
          // activeTile
          activeTile.setEmptyState(true);
          activeTile.setType("");
          // Dom tile
          $(t).removeClass(tileType);
        } else if (activeToolType == "inventory") {
          // Inventory
          // place tile
          if (activeTool.canPlaceTile(activeTile)) {
            activeTool.placeTile(activeTile, activeTileType);
            $(t).addClass(activeTile.type);
            //audio
            setResource.play();
            // modify inventory counter
            let counterValue = parseInt($("#" + activeTileType).text());
            counterValue--;
            // set counter value
            $("#" + activeTileType).text(counterValue);
            // disable at 0
            if (counterValue == 0) {
              // disable inventory button
              $("#" + activeTileType).css("pointer-events", "none");
              $("#" + activeTileType).css("opacity", .5);

              // clear active tool
              activeTool = ""
              activeToolType = ""
              activeTile = ""
              activeTileType = ""
            }
          } else {
            error.play();
          }
        } else {
          // reject effect
          // audio
          $(`#${activeTool.name}`).css("background-color", "red");
          setInterval(function () {
            $(`#${activeTool.name}`).css("background-color", "");
          }, 600);
          error.play();
        }
        //
      } else {
        // Pick a tool first
        // audio
        error.play();
      }
    });
  });
  // Tools
  let tools = $(".tool:not(.inv)");
  Array.from(tools).forEach(tool => {
    $(tool).on("click", () => {
      // obtain clicked tool
      let toolType = tool.id;
      activeToolType = toolType;
      switch (activeToolType) {
        case "shovel":
          activeTool = new Shovel();
          break;
        case "axe":
          activeTool = new Axe();
          break;
        case "pickaxe":
          activeTool = new pickAxe();
          break;
      }
      //set activeTool's isActive property to true
      activeTool.setActiveState(true);
      // audio
      toolSelect.play();
      toggleButton();
    });
  });
  // Inventory
  let inventoryButtons = $(".inv");
  Array.from(inventoryButtons).forEach(inv => {
    // Reset on startup
    $(inv).text("0");
    $(inv).css("pointer-events", "none");
    $(inv).css("opacity", .5);

    //
    $(inv).on("click", () => {
      let inventoryType = inv.id;
      let inventoryButtonCounter = $(inv).text();
      // create inventory object
      activeTool = new Inventory();
      if (inventoryButtonCounter == "0") {
        // inv empty
      } else {
        activeTileType = inventoryType;

        // change activeTool to inventory
        // change activeToolType to inventory
        activeToolType = activeTool.type;
        // change cursor to tile
        let newToolString = `url("./img/${activeTileType}.png") 26 0 , auto`;
        $(".container").css("cursor", newToolString);

        //audio
        toolSelect.play();
      }
    });
  });
  // Auxiliary functions
  // Toggle tool button
  let toggleButton = () => {
    if (this.isActive) {
      // Turn off
      this.isActive = false;
      // remove tool-specific cursor
      resetMouseCursor();
      // change button css accordingly
    } else {
      // Turn on
      // change button css accordingly
      this.isActive = true;
      // set tool-specific cursor
      changeMouseCursor();
    }
  };
  // Change mouse cursor to match tool
  let changeMouseCursor = () => {
    let newToolString = `url("./img/${activeToolType}-c.png") 26 0 , auto`;
    $(".container").css("cursor", newToolString);
  };
  // Reset mouse cursor
  let resetMouseCursor = () => {
    $(".container").css("cursor", "auto");
  };
});

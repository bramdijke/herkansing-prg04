---
name: gamepad-support
description: 'Add gamepad support to existing games with keyboard controls. Use when adding joystick, arcade, PS4/Xbox controller, or arcade cabinet input to games that already handle cursor keys or WASD keyboard input.'
argument-hint: 'Game class with keyboard controls'
---

# Gamepad Support

Add gamepad input to games that already have keyboard controls for cursor keys or WASD keys. Gamepads work with PS4/Xbox controllers, arcade joysticks, and arcade cabinets.

## When to Use

- Game has keyboard controls (cursor keys or WASD) you want to mirror with gamepad
- Adding arcade cabinet or joystick support
- Adding local multiplayer via multiple controllers
- Maintaining keyboard controls while adding gamepad as an alternative input method

## Procedure

### Step 1: Enable Gamepad Input in Game Class

In your `Game` class `startGame()` method, enable gamepad detection:

```javascript
export class Game extends Engine {
    startGame() {
        this.input.gamepads.enabled = true
    }
}
```

### Step 2: Add Gamepad Input to Player onPreUpdate()

In your `Player` actor class, modify the `onPostUpdate()` method to check for gamepad input in addition to keyboard:

```javascript
export class Player extends Actor {

    onPreUpdate(engine) {
        if (engine.input.gamepads.at(0).wasButtonPressed(Buttons.Face1)) {
            console.log("Gamepad 0, button 1 pressed");
        }
        if (engine.input.gamepads.at(1).wasButtonPressed(Buttons.Face1)) {
            console.log("Gamepad 1, button 1 pressed");
        }

        // bewegen
        const xValue = engine.input.gamepads.at(0).getAxes(Axes.LeftStickX)
        const yValue = engine.input.gamepads.at(0).getAxes(Axes.LeftStickY)

        console.log(`X: ${xValue} Y: ${yValue}`)

        let speed = 100
        this.vel = new Vector(xValue * speed, yValue * speed)
        
    }
}
```


### Step 3: Common Button Mappings

Reference button names when mapping gamepad actions:

| Button | Code |
|--------|------|
| A (PlayStation ✕, Xbox X) | `Buttons.Face1` |
| B (PlayStation ○, Xbox A) | `Buttons.Face2` |
| X (PlayStation □, Xbox Y) | `Buttons.Face3` |
| Y (PlayStation △, Xbox B) | `Buttons.Face4` |
| LB / L1 | `Buttons.LeftBumper` |
| RB / R1 | `Buttons.RightBumper` |
| Start | `Buttons.Menu` |
| Select | `Buttons.View` |

### Step 4: Optional — Test and Adjust Stick Sensitivity

If movement feels too fast or too slow with gamepad, adjust the multiplier:

```javascript
const stickMultiplier = 8 // Adjust this value (lower = slower, higher = faster)
if (engine.mygamepad) {
    moveX += engine.mygamepad.getAxes(Axes.LeftStickX) * stickMultiplier
    moveY += engine.mygamepad.getAxes(Axes.LeftStickY) * stickMultiplier
}
```

## Tips

- **Stick Deadzone**: Excalibur handles stick deadzone automatically
- **Multiple Controllers**: Each `connect` event is a new controller—save each one in different player instances for local multiplayer
- **Combined Input**: Always add gamepad to keyboard input (use `+=` or separate detection) so both work simultaneously
- **No Nested Functions**: Create methods instead of inline functions in event handlers

## Local Multiplayer

For local multiplayer with multiple controllers, assign each gamepad to a player:

```javascript
export class Game extends Engine {
    startGame(){
        this.input.gamepads.enabled = true

        let gamepadOne = engine.input.gamepads.at(0)
        this.add(new Player(gamepadOne)

        let gamepadTwo = engine.input.gamepads.at(1)
        this.add(new Player(gamepadTwo)
    }
}
```
```js
export class Player extends Actor {

    mygamepad

    constructor(gamepad){
        this.mygamepad = gamepad
    }

    onPreUpdate(engine) {
        const x = this.mygamepad.getAxes(Axes.LeftStickX)
        const y = this.mygamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(x * 10, y * 10)

        if (this.mygamepad.isButtonPressed(Buttons.Face1)) {
            console.log('Jump!')
        }
    }
}
```

## References

See [gamepad snippets](../../../snippets/gamepad.md) for additional patterns and advanced usage like button events and manual gamepad detection.

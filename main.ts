enum RadioMessage {
    message1 = 49434
}
input.onButtonEvent(Button.AB, ButtonEvent.LongClick, function () {
    basic.showLeds(`
        # # . . .
        # # . . .
        . . . . .
        . . . # #
        . . . # #
        `)
    basic.pause(500)
    basic.clearScreen()
    radio.sendNumber(faktor1)
    radio.sendString("*")
    radio.sendNumber(faktor2)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Antwort = 0
    Rechenaufgabe()
    basic.pause(500)
    basic.showNumber(Antwort)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (Antwort == Ergebnis) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
        basic.setLedColor(0x00ff00)
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        basic.setLedColor(0xff0000)
    }
    basic.pause(2000)
    basic.clearScreen()
    basic.turnRgbLedOff()
})
function Rechenaufgabe () {
    faktor1 = randint(1, 9)
    faktor2 = randint(1, 9)
    Ergebnis = faktor1 * faktor2
    basic.showNumber(faktor1)
    basic.showString("*")
    basic.showNumber(faktor2)
    basic.clearScreen()
}
let Ergebnis = 0
let Antwort = 0
let faktor2 = 0
let faktor1 = 0
game.setScore(0)
basic.forever(function () {
    if (input.isGesture(Gesture.TiltLeft)) {
        Antwort += 1
        basic.showNumber(Antwort)
    } else if (input.isGesture(Gesture.TiltRight)) {
        Antwort += 10
        basic.showNumber(Antwort)
    } else if (input.isGesture(Gesture.ScreenDown)) {
        Antwort = 0
        basic.showNumber(Antwort)
    }
})

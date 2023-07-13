enum RadioMessage {
    message1 = 49434,
    Aufgabe = 15415
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == Ergebnis) {
        radio.sendNumber(1)
        basic.setLedColor(0xffff00)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # # # # #
            . . . . .
            `)
        basic.pause(500)
    } else {
        radio.sendNumber(2)
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.turnRgbLedOff()
    basic.clearScreen()
    Antwort = 0
    Rechenaufgabe()
    basic.pause(200)
    basic.showNumber(Antwort)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (Antwort == Ergebnis) {
        radio.sendNumber(3)
        game.addScore(1)
        basic.setLedColor(0x00ff00)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
        basic.pause(500)
    } else {
        basic.setLedColor(0xff0000)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        basic.pause(500)
    }
    if (game.score() == 2) {
        Sieg()
    }
})
function Rechenaufgabe () {
    faktor1 = randint(1, 9)
    faktor2 = randint(1, 9)
    Ergebnis = faktor1 * faktor2
    radio.sendString("" + faktor1 + "*" + faktor2)
    basic.showString("" + faktor1 + "*" + faktor2)
    basic.clearScreen()
}
function Sieg () {
    music.playTone(523, music.beat(BeatFraction.Whole))
    music.playTone(659, music.beat(BeatFraction.Whole))
    music.playTone(587, music.beat(BeatFraction.Whole))
    music.playTone(659, music.beat(BeatFraction.Whole))
    music.playTone(784, music.beat(BeatFraction.Whole))
    music.playTone(698, music.beat(BeatFraction.Whole))
    music.playTone(880, music.beat(BeatFraction.Whole))
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . # # # .
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . # # # .
        . # # # .
        `)
    basic.showLeds(`
        . . # . .
        . # # # .
        . # # # .
        . # # # .
        # # # # #
        `)
    basic.showLeds(`
        . # # # .
        . # # # .
        . # # # .
        # # # # #
        . . . . .
        `)
    basic.showLeds(`
        . # # # .
        . # # # .
        # # # # #
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . # # # .
        # # # # #
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        # # # # #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
}
let faktor2 = 0
let faktor1 = 0
let Antwort = 0
let Ergebnis = 0
basic.showString("A")
radio.setGroup(1)
game.setScore(0)
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
basic.forever(function () {
    _4digit.bit(game.score(), 1)
    if (input.isGesture(Gesture.TiltLeft)) {
        Antwort += 1
        basic.showNumber(Antwort)
    } else if (input.isGesture(Gesture.TiltRight)) {
        Antwort += 10
        basic.showNumber(Antwort)
    } else if (input.isGesture(Gesture.ScreenDown)) {
        Antwort += -1
        basic.showNumber(Antwort)
    } else if (input.isGesture(Gesture.Shake)) {
        Antwort = 0
        basic.showNumber(Antwort)
    }
})

enum RadioMessage {
    message1 = 49434,
    Aufgabe = 15415
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == Ergebnis) {
        Knopf_B_an = false
        radio.sendNumber(1)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # # # # #
            . . . . .
            `)
        basic.setLedColor(0xffff00)
        PunkteB += 1
        Knopf_A_an = true
    } else {
        radio.sendNumber(2)
    }
    if (PunkteB == 5) {
        Knopf_B_an = false
        radio.sendNumber(20)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        basic.setLedColor(0xff0000)
        basic.pause(4000)
        music.playTone(233, music.beat(BeatFraction.Whole))
        music.playTone(208, music.beat(BeatFraction.Whole))
        music.playTone(185, music.beat(BeatFraction.Whole))
        music.playTone(165, music.beat(BeatFraction.Whole))
        PunkteA = 0
        PunkteB = 0
        Knopf_A_an = true
        basic.clearScreen()
        basic.turnRgbLedOff()
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (Knopf_A_an) {
        basic.turnRgbLedOff()
        basic.clearScreen()
        Antwort = 0
        Rechenaufgabe()
        basic.pause(200)
        basic.showNumber(Antwort)
        Knopf_A_an = false
        Knopf_B_an = true
    } else {
        basic.pause(200)
        basic.showString("" + faktor1 + "*" + faktor2)
        basic.showNumber(Antwort)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (Knopf_B_an == true) {
        Knopf_B_an = false
        if (Antwort == Ergebnis) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                `)
            basic.setLedColor(0x00ff00)
            radio.sendNumber(3)
            PunkteA += 1
            Knopf_A_an = true
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
        if (PunkteA == 5) {
            radio.sendNumber(10)
            Sieg()
            PunkteA = 0
        }
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
    music.playTone(698, music.beat(BeatFraction.Whole))
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
        . # . # .
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
    basic.turnRgbLedOff()
}
let faktor2 = 0
let faktor1 = 0
let Antwort = 0
let Ergebnis = 0
let Knopf_B_an = false
let Knopf_A_an = false
let PunkteB = 0
let PunkteA = 0
basic.showString("A")
radio.setGroup(1)
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
PunkteA = 0
PunkteB = 0
Knopf_A_an = true
Knopf_B_an = true
basic.forever(function () {
    _4digit.bit(PunkteA, 0)
    _4digit.point(true)
    _4digit.bit(PunkteB, 3)
    if (Knopf_B_an == true) {
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
    }
})

pins.setPull(DigitalPin.P3, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
// P0: LED Trig
// P1: Bewegungssensor PIR
// P2: Helligkeitssensor
// P3: Hauptschalter Regelung ON/OFF
basic.forever(function () {
    // Checken ob der Hauptschalter ein ist.
    if (pins.digitalReadPin(DigitalPin.P3) == 0) {
        // Nur wenn der Hauptschalter ein ist. Regelung starten und checken ob Helligkeit genügend niedrig (Abend). Dann Beleuchtung einschalten
        // 
        if (pins.analogReadPin(AnalogPin.P2) < 300) {
            // Wenn der Bewegungssensor aktiviert wurde dann einschalten. sonst nix machen. Nur BIld zeigen
            if (pins.digitalReadPin(DigitalPin.P1) == 1) {
                // Beleuchtung einschalten
                // 
                pins.digitalWritePin(DigitalPin.P0, 1)
                images.iconImage(IconNames.ArrowEast).showImage(0)
            } else {
                // Ansonsten Beleuchtung ausschalten
                pins.digitalWritePin(DigitalPin.P0, 0)
                images.iconImage(IconNames.Yes).showImage(0)
            }
        } else {
            // Ansonsten Beleuchtung ausschalten
            pins.digitalWritePin(DigitalPin.P0, 0)
            images.iconImage(IconNames.Happy).showImage(0)
        }
    } else {
        // Falls Hauptschalter aus, Bleuchtung immer ein ohne Regelung
        pins.digitalWritePin(DigitalPin.P0, 1)
        images.iconImage(IconNames.No).showImage(0)
    }
})

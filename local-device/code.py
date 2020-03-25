import time
import board
import neopixel
import busio
import digitalio

num_chars_read = 32

uart = busio.UART(board.TX, board.RX, baudrate=9600)

# On CircuitPlayground Express, and boards with built in status NeoPixel -> board.NEOPIXEL
# Otherwise choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D1
pixel_pin = board.NEOPIXEL

# On a Raspberry pi, use this instead, not all pins are supported
#pixel_pin = board.D18

# The number of NeoPixels
num_pixels = 10

# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.GRB

pixels = neopixel.NeoPixel(pixel_pin, num_pixels,
                           brightness=0.2, auto_write=False, pixel_order=ORDER)


def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos*3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos*3)
        g = 0
        b = int(pos*3)
    else:
        pos -= 170
        r = 0
        g = int(pos*3)
        b = int(255 - pos*3)
    return (r, g, b) if ORDER == neopixel.RGB or ORDER == neopixel.GRB else (r, g, b, 0)


def rainbow_cycle(wait):
    for j in range(255):
        for i in range(num_pixels):
            pixel_index = (i * 256 // num_pixels) + j
            pixels[i] = wheel(pixel_index & 255)
        pixels.show()
        time.sleep(wait)


good_color = (0, 255, 0)
bad_color = (255, 0, 0)
neutral_color = (66, 33, 99)

active_color = neutral_color

while True:

    data = uart.read(32)

    if data is not None:
        data = data.splitlines()
        for lines in data:
            line = ''.join([chr(b) for b in lines])
            if line == "ALERT:HIGH":
                print("Got alert signal, color should be red")
                active_color = bad_color
            elif line == "ALERT:LOW":
                print("Got alert signal, color should be green")
                active_color = good_color
            elif line == "ALERT:RESET":
                print("Got alert signal, color should be neutral")
                active_color = neutral_color

    pixels.fill(active_color)
    pixels.show()

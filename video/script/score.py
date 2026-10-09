"""Synthesise the "Ghosts" score from the film's own timing.

Usage: python script/score.py <cues.json> <out.wav>
Requires numpy and soundfile. cues.json is written by scripts/render.mjs and holds
the film's event times (T), narration times (VO) and total length.

Everything here is generated from sine waves and filtered noise, so the score is
original and free to use. It is mixed quietly under the narration and ducked
whenever she speaks.
"""

import json
import sys

import numpy as np
import soundfile as sf

SR = 48000
RNG = np.random.default_rng(7)

cues = json.loads(open(sys.argv[1]).read())
T, VO, TOTAL = cues["T"], cues["VO"], cues["total"]
N = int(TOTAL * SR) + SR
t = np.arange(N) / SR
L = np.zeros(N)
R = np.zeros(N)
send = np.zeros(N)  # reverb send (mono)


# ── helpers ────────────────────────────────────────────────────────────────

def idx(sec):
    return max(0, min(N, int(sec * SR)))


def add(sig, at, gain=1.0, pan=0.0, rev=0.0):
    """Mix a mono signal in at `at` seconds with constant-power pan (-1..1)."""
    i = idx(at)
    n = min(len(sig), N - i)
    if n <= 0:
        return
    s = sig[:n] * gain
    angle = (pan + 1) * np.pi / 4
    L[i : i + n] += s * np.cos(angle)
    R[i : i + n] += s * np.sin(angle)
    send[i : i + n] += s * rev


def lowpass(sig, cutoff):
    spec = np.fft.rfft(sig)
    f = np.fft.rfftfreq(len(sig), 1 / SR)
    spec *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(spec, len(sig))


def bandpass(sig, lo, hi):
    spec = np.fft.rfft(sig)
    f = np.fft.rfftfreq(len(sig), 1 / SR)
    spec *= (1 / np.sqrt(1 + (lo / np.maximum(f, 1)) ** 4)) * (1 / np.sqrt(1 + (f / hi) ** 4))
    return np.fft.irfft(spec, len(sig))


def env_ad(n, attack, decay):
    x = np.arange(n) / SR
    return np.minimum(1, x / max(attack, 1e-4)) * np.exp(-np.maximum(0, x - attack) / decay)


def tone(freq, dur, attack=0.005, decay=0.4, partials=((1, 1.0),)):
    n = int(dur * SR)
    x = np.arange(n) / SR
    sig = sum(a * np.sin(2 * np.pi * freq * m * x) * np.exp(-x / (decay / (1 + 0.6 * (m - 1)))) for m, a in partials)
    return sig * np.minimum(1, x / attack)


def thump(f0=95, f1=46, dur=0.45, decay=0.12):
    n = int(dur * SR)
    x = np.arange(n) / SR
    freq = f1 + (f0 - f1) * np.exp(-x / 0.03)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    return np.sin(phase) * np.exp(-x / decay)


def noise(dur):
    return RNG.standard_normal(int(dur * SR))


def whoosh(dur=0.9, peak=0.45, lo=250, hi=3500):
    n = int(dur * SR)
    x = np.arange(n) / SR
    e = np.where(x < peak, (x / peak) ** 2, np.exp(-(x - peak) / (dur - peak) * 4))
    return bandpass(noise(dur), lo, hi) * e


def click(dur=0.006):
    return bandpass(noise(dur), 2000, 9000) * np.exp(-np.arange(int(dur * SR)) / SR / 0.0015)


# ── pad: A minor 9 → F maj7 → C add9 ───────────────────────────────────────

CHORDS = {
    "am": [110.0, 164.81, 196.0, 246.94, 261.63],
    "am_bright": [110.0, 164.81, 196.0, 246.94, 261.63, 329.63],
    "fmaj": [87.31, 130.81, 174.61, 220.0, 329.63],
    "cadd9": [65.41, 130.81, 196.0, 329.63, 587.33],
}


def pad(chord, start, end, fade_in=1.2, fade_out=1.0, gain=0.05):
    n = idx(end) - idx(start)
    if n <= 0:
        return
    x = np.arange(n) / SR
    sig = np.zeros(n)
    for k, f in enumerate(CHORDS[chord]):
        for detune, a in ((0.9988, 0.5), (1.0012, 0.5)):
            sig += a * np.sin(2 * np.pi * f * detune * x + k)
            sig += 0.12 * a * np.sin(2 * np.pi * 2 * f * detune * x)
    sig *= 1 + 0.15 * np.sin(2 * np.pi * 0.18 * x)  # slow breathing
    e = np.minimum(1, x / fade_in) * np.minimum(1, (x[-1] - x) / fade_out + 1e-9)
    sig = lowpass(sig * e, 1800)
    add(sig, start, gain, pan=0, rev=0.35)


pad("am", 0.0, T["freeze"] + 0.05, fade_in=2.5, fade_out=0.08)
pad("am_bright", T["unfreeze"] - 0.1, T["zoomOut"] + 0.6, fade_in=0.4, fade_out=0.8, gain=0.055)
pad("fmaj", T["zoomOut"], T["end"] + 0.5, fade_in=1.0, fade_out=0.8, gain=0.055)
pad("cadd9", T["end"], TOTAL, fade_in=0.8, fade_out=1.6, gain=0.06)

# ── tension: heartbeat pulse that doubles as she heads for the exit ────────

beat = 0.6
s = T["read"]
while s < T["freeze"] - 0.05:
    leaving = s >= T["leave"]
    add(thump(), s, 0.16 if not leaving else 0.22, rev=0.05)
    if leaving:
        add(click(), s + 0.15, 0.09, pan=0.3)
    s += beat / 2 if leaving else beat

# ── whooshes on camera moves ───────────────────────────────────────────────

add(whoosh(1.0, 0.55), T["dive"] - 0.45, 0.10, pan=-0.2, rev=0.2)
add(whoosh(0.8, 0.4), T["read"] + 2.75, 0.08, pan=0.4, rev=0.2)
add(whoosh(0.7, 0.3, 300, 5000), T["whip"] - 0.2, 0.12, pan=0.5, rev=0.2)
add(whoosh(1.6, 1.0, 150, 2500), T["zoomOut"], 0.09, rev=0.3)

# ── freeze: rising swell, hard stop, frozen shimmer ────────────────────────

swell_d = 0.7
x = np.arange(int(swell_d * SR)) / SR
swell = lowpass(noise(swell_d), 2500) * (x / swell_d) ** 3
add(swell, T["freeze"] - swell_d, 0.10, rev=0.2)
add(thump(70, 32, 1.2, 0.35), T["freeze"], 0.22, rev=0.3)
frozen_d = T["unfreeze"] - T["freeze"]
x = np.arange(int(frozen_d * SR)) / SR
shimmer = (np.sin(2 * np.pi * 1318.5 * x) + 0.6 * np.sin(2 * np.pi * 1975.5 * x)) * (1 + 0.3 * np.sin(2 * np.pi * 5.5 * x))
shimmer *= np.minimum(1, x / 0.6) * np.minimum(1, (x[-1] - x) / 0.3 + 1e-9)
add(shimmer, T["freeze"], 0.012, rev=0.6)
drone = np.sin(2 * np.pi * 55 * x) * np.minimum(1, x / 0.8) * np.minimum(1, (x[-1] - x) / 0.3 + 1e-9)
add(drone, T["freeze"], 0.035)

for i, f in enumerate((880.0, 1108.73, 1318.51)):  # three futures appear
    add(tone(f, 0.9, decay=0.35), T["futures"] + i * 0.22, 0.05, pan=(i - 1) * 0.4, rev=0.6)
add(tone(1760.0, 1.4, decay=0.6, partials=((1, 1.0), (1.5, 0.4))), T["select"], 0.06, rev=0.7)

# ── unfreeze: impact as time resumes ───────────────────────────────────────

rev_d = 0.45
x = np.arange(int(rev_d * SR)) / SR
add(lowpass(noise(rev_d), 3000) * (x / rev_d) ** 2, T["unfreeze"] - rev_d, 0.08)
add(thump(120, 40, 1.0, 0.25), T["unfreeze"], 0.24, rev=0.25)

# ── typing, the name, the money ────────────────────────────────────────────

for k in range(17):
    add(click(0.008), T["typing"] + k * (1.0 / 17) + RNG.uniform(-0.01, 0.01), 0.05, pan=RNG.uniform(-0.2, 0.2))
add(tone(659.25, 1.0, decay=0.4), T["named"], 0.05, rev=0.5)
add(tone(880.0, 1.2, decay=0.5), T["named"] + 0.16, 0.05, rev=0.5)

bell = tone(523.25, 3.0, attack=0.003, decay=1.2, partials=((1, 1.0), (2.0, 0.55), (2.76, 0.4), (3.0, 0.25), (5.4, 0.15)))
add(bell, T["money"], 0.10, rev=0.6)
add(thump(80, 40, 1.0, 0.3), T["money"], 0.16, rev=0.2)

# ── the grid lights up: pentatonic sparkles ────────────────────────────────

pent = [880.0, 1046.5, 1174.66, 1318.51, 1567.98]
for k in range(24):
    at = T["grid"] + 0.3 + RNG.uniform(0, max(0.5, T["end"] - T["grid"] - 0.6))
    add(tone(RNG.choice(pent), 0.6, decay=0.22), at, 0.022, pan=RNG.uniform(-0.8, 0.8), rev=0.7)

# ── end: logo hit ──────────────────────────────────────────────────────────

add(thump(90, 36, 1.6, 0.45), T["end"] + 0.2, 0.2, rev=0.35)

# ── reverb (convolution with a decaying noise tail) and master ─────────────

ir_d = 2.4
x = np.arange(int(ir_d * SR)) / SR
ir = lowpass(noise(ir_d), 5000) * np.exp(-x / 0.55)
ir /= np.sqrt(np.sum(ir**2))
size = 1 << int(np.ceil(np.log2(N + len(ir))))
wet = np.fft.irfft(np.fft.rfft(send, size) * np.fft.rfft(ir, size), size)[:N]
wet_r = np.fft.irfft(np.fft.rfft(send, size) * np.fft.rfft(np.roll(ir, 211), size), size)[:N]
L += wet * 0.35
R += wet_r * 0.35

out = np.stack([L, R], axis=1)[: int(TOTAL * SR)]
out = np.tanh(out * 1.2) / 1.2  # gentle soft clip
out /= max(1e-9, np.max(np.abs(out))) / 0.89
sf.write(sys.argv[2], out.astype(np.float32), SR)
print(f"score: {sys.argv[2]} ({len(out) / SR:.1f}s)")

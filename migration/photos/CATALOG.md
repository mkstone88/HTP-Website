# Project photo catalog — Drive drop (2026-07-20)

Source: Matt's shared Drive folder `1zDggrHazLGQWeYc_9uT4eCMEgoxzPz8R`
(set to **Anyone with the link**, so files pull directly via
`curl -sL "https://drive.google.com/uc?export=download&id=<FILE_ID>" -o out.jpg`).

**Big picture:** most of the Drive drop is **already on the site** (the WordPress migration
had pulled the bulk of the library). Bethany already had a full local set; the 9409 SW 32nd
and 5613 NE 107th interior sets are already in use; Clydesdale barns + Victory Baptist church
images are already in `public/uploads/`. Only the items below are **genuinely new / unused** —
tagged here so a future session can grab them without re-curating.

## Placed this session
- Edmond city page — `16112RomeoDr-Edmond.webp` (Romeo Dr exterior)
- Mustang city page — `exterior-painters-mustang.webp`
- Yukon city page — `yukon-500-war-eagle-exterior.webp` (500 War Eagle Dr)
- Commercial page — `commercial-office-repaint-okc.webp` (office w/ ADA ramp, oct 2025)

## NEW & UNUSED — ready to place when needed

### Interior — 5616 NW 130th St (full interior job, 7 pro photos, Jan 2026)
A complete, professionally shot interior. Great for the interior page, homepage recent-work,
or the gallery. Drive file IDs:
- `1rbfGBB4sVIG9m1yfXNdtSojDXLV3kflh`  (-14)
- `1h7CMX1UAIlnyMAJIJA7DhWK85dQfnEmj`  (-13)
- `1n-j06WTJMtbaw6Y5lV_lawJ7PDxrg9GG`  (-11)
- `1BqRuFIjLb8Ae7ti6eAWKNrAj9BBLtaj6`  (-9)
- `1hm8rLHagw0VJtVDRmrThpm0FovUXuMGj`  (-6)
- `19d9t5nM1MpztkBXta1g16CMzj7RaCLQo`  (-3)
- `1ObuLf2PYRRIXVps_xH65ImraJzSx1_9_`  (-1)

### Interior — misc
- Yukon interior — `1yx8SCfPBUP-8RdlcOhUK_aNqsgZ8Fqk_` (good for the Yukon page's interior proof)
- 20240213 interior — `1VPH0Q-C_VTeSaDSlSsXYtX6TvcOD8_GO` (verify vs repo first)

### Commercial
- Building entrance (white w/ brown trim) — `1Rxo0y5Vj-MkaKaUBOLQNv_8gQjB36uep`
  (optimized once as commercial-building-entrance-okc.webp then removed as an extra; re-pull if wanted)

### Exterior root — loose shots to review for city-tagged, not-yet-on-site exteriors
Recent phone/camera shots in the Drive **Exterior** folder root (`1Ot5TIyCfUsiOJaOPc-xiVoyHuc6cmjvb`).
Check each against `public/uploads/` before use (some may already be present):
- `1c-4DU42rLw4KzxqJVjuoKFfo2jtf93sy` (20250925_140149) · `1MdVIMpgWSC0SF4aqwNoQXI7yCkMqawFW` (20250925_140127)
- `1vz4jeOx71NtJmrFs7ATMvPkXb1ueoGrs` (20240722_144152) · `1gBbDKYt16WMrxZ5E9gZQ7UtTzYNnO09c` (20240722_144139)
- `1GVuy0dpQhsx1aUiZqvzO5ZC0jjh8IB3x` (20240618_125932) · `1O2FPtMLAFx6r6S_PcL4DgYSen6dhTpgV` (20240612_150852)
- `1jWRpFKgRafDG9Qj6HmzX_fZGtYi1pxBE` (Romeo Dr Before) · `1ppK-oNVri_ZEwPH-vRGqIXHWEOjHabwo` (IMG_1460)

## Drive folder IDs (for re-listing)
- root `1zDggrHazLGQWeYc_9uT4eCMEgoxzPz8R` · Interior `1IS72eqAIg4VnLR732-vfYSkXy6NFVSVi`
  · Exterior `1Ot5TIyCfUsiOJaOPc-xiVoyHuc6cmjvb` · Fence & Stain `1DU86XZuAdzakl5bt5CKK3lwJxFrDTPlh`
  · Bethany `1Mk-1KUb5o8LP8GXpFG2ynsOcZ1kJD0Zj` · Commercial `1qAgAi5b4Y_E7ycFPNcpYranGNyZdZrsM`
- Exterior city subfolders: Edmond, Yukon, Mustang, Mesta Park, Nichols Hills(empty), OKC, Brick Painting

## Company Cam (for city-thin sourcing — NOT yet available)
Matt added a Company Cam API credential to the env, but env vars added mid-session don't reach a
running session — it was **not present** in this session's environment. In a **fresh session** it
should be available; Company Cam photos carry customer addresses, so they can source
**city-specific** shots when a city page is thin (e.g. Nichols Hills, or more Bethany/Mustang).
Confirm the exact env var name on next run.

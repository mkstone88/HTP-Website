// Registry of Hometown Painting's own YouTube videos that get embedded on the
// site. Titles/dates are the real values from YouTube (verified via oEmbed +
// the watch page). The page template ([...slug].astro) scans each page body for
// `data-yt="<id>"` facade blocks and emits VideoObject schema from this map, so
// re-embedded videos regain the rich-result eligibility the old WP site had.
//
// Embeds use a click-to-load facade (see .yt-facade in global.css + the loader
// in BaseLayout) so a YouTube iframe/player is only fetched when the visitor
// actually clicks play — zero third-party JS or cookies on initial page load.

export const videos = {
  'llBUrl-jlWo': {
    title: 'Historic Home Revitalized — Mesta Park Exterior Painting Testimonial',
    description:
      'A Hometown Painting customer shares their experience having their historic Mesta Park home repainted in Oklahoma City.',
    uploadDate: '2025-02-18',
  },
  'OW18pnIgdT4': {
    title: 'What to Expect at a Hometown Painting Estimate',
    description:
      'Walk through exactly what happens at a Hometown Painting estimate in the OKC metro — no pressure, no surprises.',
    uploadDate: '2023-09-27',
  },
  '_oMxmcrb5L8': {
    title: 'Exterior Siding Staining — Express Clydesdale Barns, Yukon OK',
    description:
      'How Hometown Painting restored and stained the cedar siding on the Express Clydesdale barns in Yukon, Oklahoma.',
    uploadDate: '2023-02-10',
  },
  'EKO65iJkJ2g': {
    title: 'Fence Restoration in OKC',
    description:
      'A weathered Oklahoma City fence cleaned, restored, and stained by Hometown Painting.',
    uploadDate: '2023-11-27',
  },
  'wGLtHPflKm8': {
    title: 'Interior Painting Testimonial from Yukon, OK',
    description:
      'A Yukon homeowner shares their experience having their home interior painted by Hometown Painting.',
    uploadDate: '2024-10-10',
  },
  'HbXc8P45BRI': {
    title: 'Exterior Painting Testimonial — Mustang, OK',
    description:
      'A Mustang, Oklahoma homeowner talks about their exterior repaint by Hometown Painting.',
    uploadDate: '2023-12-15',
  },
  'gWx6NIUBQWE': {
    title: 'Brick Painting Transformation — Mustang, OK',
    description:
      'A rustic brick exterior transformed into a clean, contemporary look on a Mustang, OK home by Hometown Painting.',
    uploadDate: '2023-09-18',
  },
};

// Build the click-to-load facade markup for a video id. `title` is required for
// accessibility; `caption` optionally shows under the video.
export function ytFacade(id, caption = '') {
  const v = videos[id];
  const label = v ? v.title : 'Play video';
  const cap = caption || (v ? v.title : '');
  // Poster is served locally (public/uploads/videos/<id>.jpg) so the facade makes
  // zero third-party requests until the visitor clicks play.
  return `<figure class="yt-figure">
  <button type="button" class="yt-facade" data-yt="${id}" aria-label="Play video: ${label}"
    style="background-image:url('/uploads/videos/${id}.jpg')">
    <span class="yt-play" aria-hidden="true"></span>
  </button>
  ${cap ? `<figcaption>${cap}</figcaption>` : ''}
</figure>`;
}

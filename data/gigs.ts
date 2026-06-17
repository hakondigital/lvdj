export interface GigPhoto {
  src: string;
  alt: string;
  /** Headline overlay shown when this photo is the active frame */
  headline: string;
  /** Sub line, shown beneath the headline */
  sub: string;
  /** Frame index label (e.g. "01 / 04") */
  label: string;
}

export interface ReelMedia {
  src: string;
}

export const GIGS: GigPhoto[] = [
  {
    src: "/gigs/gig-1-disco.jpg",
    alt: "LV DJ behind the deck under magenta and green disco lighting, packed dancefloor",
    headline: "Read the room.",
    sub: "Open the set. Drop the first hook. Watch the energy lift.",
    label: "01 / 04",
  },
  {
    src: "/gigs/gig-2-handsup.jpg",
    alt: "DJ raising a hand to the crowd under blue and red ceiling lights",
    headline: "Build the energy.",
    sub: "Throwbacks, current heat, the song nobody saw coming.",
    label: "02 / 04",
  },
  {
    src: "/gigs/gig-3-tunnel.jpg",
    alt: "Top-down shot of LV DJ's deck inside an arched venue with a dense crowd",
    headline: "Hold the floor.",
    sub: "An hour deep. Nobody's left the dancefloor.",
    label: "03 / 04",
  },
  {
    src: "/gigs/gig-4-deck.jpg",
    alt: "LV DJ at the decks with the crowd cheering, moving-head light beside the rig",
    headline: "End the night loud.",
    sub: "Closing track on. Lights up. They'll remember it.",
    label: "04 / 04",
  },
];

/**
 * Two short reel clips shown side-by-side in the Floor Footage section.
 */
export const REEL: ReelMedia[] = [
  { src: "/gigs/reel-1.mp4" },
  { src: "/gigs/reel-2.mp4" },
];


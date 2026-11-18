/**
 * Things you will want to change without touching the design.
 * After editing, push to GitHub and the site updates itself.
 */

/** First day of the next group, as YYYY-MM-DD. The banner hides itself after this day. */
export const NEXT_START_DATE = '2026-12-04';

/** Seats still open in that group. Set to 0 to show "full" wording off (the banner hides). */
export const SEATS_LEFT = 6;

/** Where classes and the Sunday workshop happen (Hive Co-working Space, Fayoum). */
export const LOCATION = {
  lat: 29.3204003,
  lng: 30.8410545,
  /** Opens the place itself in Google Maps (name, reviews, directions). */
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Hive%20co-working%20space%20Fayoum&query_place_id=ChIJbcVFP415WRQRufy3jcaMgtA',
};

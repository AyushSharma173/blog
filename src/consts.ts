import site from "./data/site.json";

export const SITE_TITLE = site.title;
export const SITE_DESCRIPTION = site.description;
export const AUTHOR = site.author;
export const AUTHOR_EMAIL = site.author_email;
export const HOME_HEADING = site.home_heading;
export const HOME_BIO = site.home_bio;
export const HOME_FONT = site.home_font as "serif" | "sans";
export const HOME_BIO_FONT = site.home_bio_font as "serif" | "sans";

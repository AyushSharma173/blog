import site from "./data/site.json";

export const SITE_TITLE = site.title;
export const SITE_DESCRIPTION = site.description;
export const AUTHOR = site.author;
export const AUTHOR_EMAIL = site.author_email;
export const HOME_HEADING = site.home_heading;
export const HOME_BIO = site.home_bio;
export const HOME_FONT = site.home_font as "serif" | "sans";
export const HOME_BIO_FONT = site.home_bio_font as "serif" | "sans";
export const HOME_BIO_SIZE = site.home_bio_size as
  | "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl" | "text-3xl";
export const HOME_BIO_ITALIC = site.home_bio_italic as boolean;
export const HOME_BIO_WEIGHT = site.home_bio_weight as "normal" | "semibold";
export const HOME_BIO_ALIGN = site.home_bio_align as "left" | "center" | "right";

import pixelsToRem from "./utils/pixelsToRem.js";

const MatchMedia = {
    mobile: window.matchMedia(`(width <= ${pixelsToRem(767.98)}rem)`),
};

export default MatchMedia;
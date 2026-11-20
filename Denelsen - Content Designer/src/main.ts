// Entry point. Fonts are self-hosted via fontsource: Open Sans (body), Fraunces (headings) and IBM Plex Mono (labels and code).
import '@fontsource-variable/open-sans/index.css';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
// Order matters: the loader runs first, then the scene, the card courier and the pull cord
// mount into their placeholders, then the page logic wires up the docs UI.
import './loader.ts';
import './scene.ts';
import './courier.ts';
import './rope.ts';
import './logo.ts';
import './contact.ts';
import './vignettes.ts';
import './page.js';

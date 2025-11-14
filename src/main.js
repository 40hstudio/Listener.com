import initHomePage from "./pages/home";

// --- Utils ---
import { loadRiveAnimation } from "./utils/rive.js";

function initAnimation() {
	initHomePage()
	loadRiveAnimation()
}

document.addEventListener('DOMContentLoaded', initAnimation);
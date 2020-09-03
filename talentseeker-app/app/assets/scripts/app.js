import "@babel/polyfill";
import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'


let mobileMenu = new MobileMenu();

new RevealOnScroll(document.querySelectorAll(".concentration__features"), 71)


if (module.hot) {
    module.hot.accept()
}
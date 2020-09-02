import debounce from 'lodash/debounce'

class MobileMenu {
    constructor() {
        this.menuIcon = document.querySelector(".menu__menu-icon");
        this.menuContent = document.querySelector(".menu__navbar");
        this.menuLinks = document.querySelectorAll(".menu__navbar--links");
        this.menuBackground = document.querySelector(".menu__navbar--background");
        this.windowWidth = window.innerWidth;
        this.height_pos = 0;
        this.id;

        if(this.menuIcon && this.menuBackground) {
            this.events()
        }
        
    }

    events() {
        this.menuIcon.addEventListener("click", ()=> this.toggleTheMenu())
        window.addEventListener("resize", debounce(() => {
            this.windowWidth = window.innerWidth
            if (this.windowWidth > 1010) {
                if(this.menuContent.classList.contains('menu__navbar--is-visible')) {
                    this.menuContent.classList.remove('menu__navbar--is-visible')
                }
                if(this.menuContent.classList.contains('menu__navbar--background--is-visible')) {
                    this.closeBackground()
                }
                if(this.menuIcon.classList.contains("menu__menu-icon--close-x")) {
                    this.menuIcon.classList.remove('menu__menu-icon--close-x')
                }
                if(this.menuLinks[0].classList.contains('menu__navbar--links--is-visible')) {
                    console.log("links visible disabled");
                    this.menuLinks.forEach((el) => {
                        el.classList.remove('menu__navbar--links--is-visible')
                    })
                }
            }
        }, 100))
    }

    async toggleTheMenu() {
        
        this.menuContent.classList.toggle("menu__navbar--is-visible")
        this.menuIcon.classList.toggle("menu__menu-icon--close-x")

        if(this.menuContent.classList.contains('menu__navbar--is-visible')) {
            this.menuBackground.classList.toggle("menu__navbar--background--is-visible")
            this.menuBackgroundIsVisible = document.querySelector(".menu__navbar--background--is-visible")
            await this.expandBackground();
            this.menuLinks.forEach((el)=> {
                el.classList.add("menu__navbar--links--is-visible")
            })
        }

        if(!this.menuContent.classList.contains('menu__navbar--is-visible')) {
            this.closeBackground()
            this.menuLinks.forEach((el) => {
                el.classList.remove("menu__navbar--links--is-visible")
            })
        }   
    }

    expandBackground() {
        return new Promise((resolve, reject) => {
            this.id = setInterval(() => {
                if(this.height_pos >= 100) {
                    resolve(clearInterval(this.id))
                } else {
                    this.menuBackgroundIsVisible.style.height = this.height_pos + 5 + '%'
                    this.height_pos = this.height_pos + 5;
                    }
            },25)
        })
    }

    closeBackground() {
        this.height_pos = 0;
        console.log("Close background");
        this.menuBackgroundIsVisible.style.height = this.height_pos + '%';
        this.menuBackground.classList.remove("menu__navbar--background--is-visible")
        clearInterval(this.id)
    }
}


export default MobileMenu
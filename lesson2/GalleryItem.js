class GalleryItem{
    constructor(href, alt){
        this.href = href;
        this.alt  = alt;
    }
    render(){
        return `<a href="${this.href}"><img src=${this.href} alt=${this.alt}</a>`
    }
}

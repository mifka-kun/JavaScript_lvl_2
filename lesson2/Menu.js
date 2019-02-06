class Menu {
    constructor(id, className, items){
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render(){
        let result = `<ul class="${this.className}" id="${this.id}">`;
        for (let item of this.items){
            if (item instanceof MenuItem || item instanceof SubMenu){
                result += item.render();
            }
        }
        result += `</ul>`;
        return result;
    }
    remove(){
        //TODO: удаление элемента ul
        let el = document.getElementById(this.id);
        if (el){
           // el.parentNode.removeChild(el); // Для старых браузеров
            el.remove();
        }
    }
}

class SubMenu extends Menu{
    constructor(href, title, id, className, items){
        super(id, className, items);
        this.href = href;
        this.title = title;
    }
    render(){
        return `<li><a href="${this.href}">${this.title}</a>${super.render()}</li>`
    }
}
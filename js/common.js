let create = parent => tag => element => parameters => { 
    x = document.createElement(tag);
    x.className = element;
    for( i in parameters){
        x.setAttribute(i, parameters[i]);
    }
    parent.appendChild(x);
    return x;
}

vanish = el => el.display = "none"

reappear = el => el.display = "initial"





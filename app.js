var app = {
    gridSize: 8,
    pixelSize: 30,
    drawingArea: document.getElementById('invader'),
    styles: ['base', 'white', 'black', 'red', 'pink', 'purple', 'blue', 'green', 'yellow', 'orange', 'brown'],
    chosenStyle: 'base',

    fillForm: () => {
        var form = document.querySelector('.configuration');
    
        var inputGridSize = document.createElement('input');
        inputGridSize.type = 'number';
        inputGridSize.placeholder = 'Taille de la grille';
        inputGridSize.value = app.gridSize;
        form.appendChild(inputGridSize);
    
        var inputPixelSize = document.createElement('input');
        inputPixelSize.type = 'number';
        inputPixelSize.placeholder = 'Taille des pixels';
        inputPixelSize.value = app.pixelSize;
        form.appendChild(inputPixelSize);


        var button = document.createElement('button');
        button.textContent = 'Valider';
        form.appendChild(button);
    
        form.addEventListener('submit', app.handleSubmit);
    },

    clearBoard: function() {
        app.drawingArea.innerHTML = '';
    },

    drawBoard: function() {
        for (var lineIndex=0; lineIndex<app.gridSize; lineIndex++) {
            var line = document.createElement('div');
            line.classList.add('line');
            app.drawingArea.appendChild(line);
            for (var columnIndex=0; columnIndex<app.gridSize; columnIndex++) {
                var pixel = document.createElement('div');
                pixel.classList.add('pixel');
                pixel.style.width = app.pixelSize + 'px'; //'25px'
                pixel.style.height = app.pixelSize + 'px'; //'25px'
                pixel.addEventListener('click', app.handlePixelClick);
    
                line.appendChild(pixel);
            }
        }
    },

    handleSubmit: function(event) {
        event.preventDefault();
        var size = +event.target[0].value;
        var pxSize = +event.target[1].value;
        if (size > 40 || size < 1){
            alert('Entrez un nombre compris entre 1 et 40 pour la taille de grille !');
        }
        else if(pxSize > 20 || pxSize < 10){
            alert('Entrez une taille de pixel comprise entre 10 et 20 !');
        }
        else {
            app.gridSize = size;
            app.pixelSize = pxSize;
            app.clearBoard();
            app.drawBoard();
        }

        // var pxSize = +event.target[1].value;
        // if(pxSize > 20 || pxSize < 10){
        //     alert('Utilisez une taille de pixel comprise entre 10 et 20 !');
        // }
        // else{
        //     app.pixelSize = pxSize;
        // }
        // app.clearBoard();
        // app.drawBoard();
    
    },

    handlePixelClick: function(event) {
        //on va devoir modifier ce qu'il se passe au click sur un pixel pour prendre en compte la couleur par d??faut (chargement de la page) ou celle choisie par le user
        //dans les deux, il faudra utilis??e l'info stocke?? dans la propri??t?? chosenStyle pour d??terminer la couleur ?? utiliser
        var pixel = event.target;
        //ici on veut :
        //- retirer toutes les classes modifiers de pixel pour repartir sur du propre
        // on parcourt le tableaux des styles et pour chaque element on retire la class pixel--styleEnCoursDansLaBoucle
        for (var i=0; i<app.styles.length; i++) {
            pixel.classList.remove(`pixel--${app.styles[i]}`);
        }
        //- appliquer au pixel le modifier qui va bien en utilisant l'info de chosenStyle
        pixel.classList.add(`pixel--${app.chosenStyle}`);
    },

    addPalette: function() {
        var footer = document.querySelector('footer');
        var palette = document.createElement('div');
        palette.className = 'palette';
        footer.appendChild(palette);
        
        for (var i=0; i<app.styles.length; i++) {
            var color = document.createElement('a');
            color.classList.add('palette__color', 'palette__color--'+app.styles[i]);
            //pour retrouver facilement la couleur cliqu??e par le user, on va stocker directement le style courant dans la balise html
            //JS nous met ?? disposition une propri??t?? dataset contenant un object qui sert le plus souvent ?? stocker nos infos custom sous la forme de propri??t??
            // https://developer.mozilla.org/fr/docs/Web/API/HTMLOrForeignElement/dataset
            color.dataset.style = app.styles[i];
            
            //on va mettre en ??vidence la couleur s??l??ctionn??e au chargement de la page
            //on compare le style en cours dans la boucle avec le style stock?? dans chosenStyle. Si c'est le bon, on lui ajoute la classe palette__color--active
            if (app.styles[i] === app.chosenStyle) {
                color.classList.add('palette__color--active');
            }
            // on profite encore une fois de notre boucle o?? on cr??e nos balises <a> pour leur coller tout de suite un EventListener 
            color.addEventListener('click', app.handleColorClick);

            palette.appendChild(color);
        }
    },

    handleColorClick(event) {
        //au click sur une couleur de la palette, on veut :
        //- enlever la classe active de la pr??c??dente couleur
        var oldColor = document.querySelector('.palette__color--active');
        oldColor.classList.remove('palette__color--active');
        //- r??cup??rer l'??l??ment cliqu?? gr??ce ?? notre cher event.target
        var currentColor = event.target;
        //- appliquer la classe active ?? cet ??l??ment
        currentColor.classList.add('palette__color--active');
        //- mettre ?? jour la propri??t?? chosenStyle de notre object en utilisant l'info stock??e dans le dataset
        app.chosenStyle = currentColor.dataset.style;
    },

    init: function() {
        app.drawBoard();
        app.fillForm();
        app.addPalette();
    }
};


document.addEventListener('DOMContentLoaded', app.init);
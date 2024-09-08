function nuevoDIV(pId, pClase) {
    const elemento = document.createElement("div");
    elemento.id = pId;
    elemento.className = pClase;

    return elemento;
}

function nuevoLabel(pReferencia, pValor) {
    const elemento = document.createElement("label");
    elemento.innerText = pValor;
    elemento.htmlFor = pReferencia;

    return elemento;
}

function nuevoInput(pTipo, pId, pNombre) {
    const elemento = document.createElement("input");
    elemento.id = pId;
    elemento.name = pNombre;
    elemento.type = pTipo;

    return elemento;
}

function NuevoContenedor(pDivPadre, pItem1, pItem2) {
    pDivPadre.appendChild(pItem1);
    pDivPadre.appendChild(pItem2);
    return pDivPadre;
}
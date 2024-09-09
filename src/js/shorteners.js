// Console

function imprimir(pValor) {
    console.log(pValor);
}

function imprimirError(pErr) {
    console.error('Error #%d', pErr);
}

// window

function ObtenerParametroActual() {
    return window.location.href.split("?")[1];
}

function validarContenidoURL(pValor) {
    return window.location.href.includes(pValor);
}

function copiarValor(pValor) {
    navigator.clipboard.writeText(pValor);
}

function guardarValorEnSS(pAlias, pValor) {
    window.sessionStorage.setItem(pAlias, pValor);
}

function leerValorEnSS(pAlias) {
    return window.sessionStorage.getItem(pAlias);
}

// DOM

function crearElemeto(pType) {
    return document.createElement(pType);
}

function removerAtributo(pObj, pAttr) {
    pObj.removeAttribute(pAttr);
}

function removerPropiedad(pObj, pProp) {
    pObj.style.removeProperty(pProp);
}

// GetID

function obtenerObjetoPorID(pId) {
    return document.getElementById(pId);
}

function obtenerValorPorID(pId) {
    return document.getElementById(pId).value;
}

function establecerValorPorID(pId, pValor) {
    document.getElementById(pId).value = pValor;
}

// GetByTags

function obtenerElementosPorTags(pObj, pTag) {
    return pObj.getElementsByTagName(pTag)
}

// QuerySelector(s)

function obtenerPorSelector(pType) {
    return document.querySelector(pType);
}

function obtenerSelectorPorIndice(pType, pIndx) {
    return document.querySelectorAll(pType)[pIndx];
}

function obtenerSelectores(pType) {
    return document.querySelectorAll(pType);
}

function obtenerSelectorPorObjeto(pObj, pType) {
    return pObj.querySelector(pType);
}
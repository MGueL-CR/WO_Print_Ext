class VPO {
    constructor(pItem, pNumero, pCantidad, pMaquina, pCaja) {
        this.item = pItem;
        this.numero = pNumero;
        this.cantidad = pCantidad;
        this.maquina = pMaquina;
        this.caja = pCaja;
    }
}

try {
    window.addEventListener("load", main, true);

} catch (err) {
    console.error('Error #%d:', err);
}

function validarContenidoURL(pValor) {
    return window.location.href.includes(pValor);
}

function main() {
    if (validarContenidoURL("crvle-vporequests")) {
        agregarBotonera();
    }

    if (validarContenidoURL("RunCardFilter.aspx")) {
        completarFormulario();
    }

    if (validarContenidoURL("RunCard.aspx")) {
        CrearObjetos();
        completarCampos();
        transformarNombre();
        propiedadesTextArea();
    }
}

function crearVPO(pFila) {
    return new VPO(
        pFila.children[0].innerText,
        pFila.children[1].innerText,
        pFila.children[6].innerText,
        pFila.children[8].innerText,
        1
    );
}

function agregarBotonera() {
    let tabla = document.getElementById("MainContent_GridView1");

    if (tabla !== null) {
        let filas = tabla.getElementsByTagName("tr");

        for (const fila of filas) {
            if (fila.children[4].innerText == "Zero Quantity") {
                let nuevaVPO = crearVPO(fila);
                let colorActual = fila.style.getPropertyValue("background-color");

                fila.children[11].className = "columnaX";
                fila.children[11].appendChild(crearBotones(nuevaVPO, colorActual));
            }
        }
    }
}

function crearBotones(pVPO, pColor) {
    let nuevoDiV = document.createElement("div");

    nuevoDiV.appendChild(btnComentario(pVPO, pColor));
    nuevoDiV.appendChild(btnAbrirLink(pVPO, pColor));

    return nuevoDiV;
}

function btnAbrirLink(pVPO, pColor) {
    const urlVortex =
        "http://vortexreports.intel.com/Reports/Card/RunCardFilter.aspx";
    let enlace = document.createElement("a");
    enlace.href = "#";
    enlace.target = "_parent";
    enlace.title = "Imprimir...";
    enlace.classList.add("sFormato", "vinculo");
    enlace.style.setProperty("--thisColor", pColor);
    enlace.innerHTML =
        "<span class='sTexto'><i class='bi bi-printer-fill'></i></span>";

    enlace.addEventListener("click", () => {
        const validarCantidad = generarComentario(pVPO);

        enlace.href = "#";
        enlace.target = "_parent";

        if (validarCantidad !== null) {
            pVPO.cantidad = validarCantidad;
            enlace.target = "_blank";
            enlace.href = `${urlVortex}?${window.btoa(JSON.stringify(pVPO))}`;
        }
    });
    return enlace;
}

function btnComentario(pVPO, pColor) {
    let btnCopiar = document.createElement("button");
    btnCopiar.id = "btnCopiar";
    btnCopiar.title = "Copiar...";
    btnCopiar.type = "buttonX";
    btnCopiar.style.setProperty("--thisColor", pColor);
    btnCopiar.classList.add("botton", "sFormato");
    btnCopiar.innerHTML =
        "<span class='sTexto'><i class='bi bi-chat-square-text-fill'></i></span>";

    //btnCopiar.addEventListener('click', comentarioDelTransfer(pVPO), false);
    btnCopiar.addEventListener("click", () => {
        generarComentario(pVPO);
    });

    return btnCopiar;
}

function generarComentario(pVPO) {
    const elemento = pVPO;

    let nuevaCantidad = 0;

    do {
        nuevaCantidad = prompt(
            `Confirme la cantidad de unidades (${elemento.cantidad} unidades actualmente): `,
            elemento.cantidad
        );
    } while (Number.isInteger(Number(nuevaCantidad)) == false);

    if (nuevaCantidad !== null) {
        let comentario = `${elemento.numero} - ${nuevaCantidad} - ${elemento.maquina}`;

        try {
            navigator.clipboard.writeText(comentario); //console.log('Texto copiado al portapapeles')
        } catch (err) {
            alert(`Atencion!\n\nError al copiar al portapapeles: \nError: ${err}`);
        }
    }

    return nuevaCantidad;
}

function completarFormulario() {
    let getData = window.location.href.split("?")[1];

    if (typeof getData !== "undefined") {
        let getVPO = JSON.parse(window.atob(getData));

        document.getElementById("ContentPlaceHolder1_VpoNumberTextBox").value =
            getVPO.numero;
        document.getElementById("ContentPlaceHolder1_UnitsPerBoxTextBox").value =
            getVPO.caja;

        sessionStorage.setItem("WOTemp", JSON.stringify(getVPO));

        document.getElementById("ContentPlaceHolder1_DisplayButton").click();
    }
}

function completarCampos() {
    let getData = sessionStorage.getItem("WOTemp");

    if (getData !== null) {
        let getVPO = JSON.parse(getData);

        document.getElementById("modulo").value = getVPO.maquina;
        document.getElementById("cantidad").value = Number(getVPO.cantidad);

        setTimeout(() => {
            window.print();
            window.close();
        }, 2500);
    }
}

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

function CrearObjetos() {
    let marco = document.getElementById("MainContent");

    let bxDetalles = nuevoDIV("detalles", "banner");
    let bxModulo = nuevoDIV("bxModulo", "caja");
    let bxCantidad = nuevoDIV("bxCantidad", "caja");

    let lblModulo = nuevoLabel("modulo", "Tool");
    let txtModulo = nuevoInput("text", "modulo", "modulo");

    let lblCantidad = nuevoLabel("cantidad", "Qty");
    let txtCantidad = nuevoInput("number", "cantidad", "cantidad");

    bxDetalles.appendChild(cajaContenedora(bxModulo, lblModulo, txtModulo));
    bxDetalles.appendChild(cajaContenedora(bxCantidad, lblCantidad, txtCantidad));

    marco.appendChild(bxDetalles);
}

function cajaContenedora(pDivPadre, pItem1, pItem2) {
    pDivPadre.appendChild(pItem1);
    pDivPadre.appendChild(pItem2);
    return pDivPadre;
}

function formatoTabla() {
    const tablaGeneral = document.getElementById(
        "ContentPlaceHolder1_RunCardDataList"
    );
    let cuerpo = tablaGeneral.querySelector("table");
    cuerpo.style.removeProperty("width");
    let partes = cuerpo.querySelector("table");
    partes.style.removeProperty("width");
    partes.className = "partes";
}

function transformarNombre() {
    const tablaDescriptiva = document.querySelectorAll("table")[2];
    let campoTitulo = tablaDescriptiva.querySelector("tr td");
    let nombreProducto = campoTitulo.innerText.split("-");


    campoTitulo.id = "nombreProducto";
    campoTitulo.removeAttribute('align');
    campoTitulo.innerText = "";

    const tituloRunCard = `${nombreProducto.shift().trim()}\n${nombreProducto
        .toString()
        .trim()
        .replace(/,/g, "-")}`;

    const marcoTitulo = nuevoDIV("tituloRC", "marcoTitulo");
    marcoTitulo.innerText = tituloRunCard;

    campoTitulo.appendChild(marcoTitulo);
}

function propiedadesTextArea() {
    let txtDetalles = document.getElementById(
        "ContentPlaceHolder1_RunCardDataList_vpodescriptionLabel_0"
    );
    txtDetalles.removeAttribute("style");
    txtDetalles.removeAttribute("rows");
    txtDetalles.removeAttribute("cols");
    txtDetalles.removeAttribute("heigth");

    txtDetalles.value = formatearDescripcion(txtDetalles);
}

function formatearDescripcion(pTextArea) {
    const descripcion = pTextArea.value.trim();

    return `${descripcion} ${formatoLista(descripcion.split(";"))}`;
}

function getSourceLots(pValue) {
    let info = "";

    if (pValue.includes("INVENTORY")) {
        info = importSourceLots(pValue, "|", "(", ",");
    } else if (pValue.includes("|")) {
        info = importSourceLots(
            pValue.slice(pValue.indexOf("|"), pValue.length),
            "|",
            "(",
            ","
        );
    } else {
        info = importSourceLots(pValue, ":", "(", ",");
    }

    return "\n\nSourceLots:" + separarLotes(info);
}

function importSourceLots(pValue, pIni, pEnd, pSplit) {
    return pValue
        .slice(pValue.indexOf(pIni) + 1, pValue.indexOf(pEnd))
        .split(pSplit);
}

function getQuantity(pValor) {
    if (pValor.includes("|")) {
        let vValor = pValor.substr(pValor.indexOf("|") + 1, pValor.length).trim();
        return (
            "(Qty " +
            vValor
                .slice(vValor.indexOf("(") + 1, vValor.indexOf(")"))
                .toString()
                .replace("Qty", " ")
                .trim() +
            ")"
        );
    } else if (pValor.includes("Qty")) {
        return (
            "(Qty " +
            pValor
                .slice(pValor.indexOf("(") + 1, pValor.indexOf(")"))
                .toString()
                .replace("Qty", " ")
                .trim() +
            ")"
        );
    } else {
        return "";
    }
}

function formatoLista(pArreglo) {
    let tipoLista = "";

    pArreglo.forEach((element) => {
        if (element.includes("Source")) {
            tipoLista = getSourceLots(element) + getQuantity(element);
        }
    });
    return tipoLista;
}

function separarLotes(pSources) {
    let textoSeparado = "\n";
    for (const item of pSources) {
        textoSeparado += item.trim() + "\n";
    }

    return textoSeparado;
}

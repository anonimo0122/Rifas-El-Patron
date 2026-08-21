/* =====================================================
   🎰 RIFA EL PATRÓN 🇨🇴
   5.000 NÚMEROS
   $40.000 COP POR NÚMERO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const TOTAL_NUMEROS = 5000;
    const PRECIO_NUMERO = 40000;

    const WHATSAPP = "573216513686";
    const NUMERO_NEQUI = "3178431850";

    /* =========================================
       BUSCAR CONTENEDOR DE NÚMEROS
    ========================================= */

    let contenedor =
        document.getElementById("contenedorNumeros");

    if (!contenedor) {
        contenedor =
            document.getElementById("numeros");
    }

    if (!contenedor) {

        console.error(
            "❌ No se encontró el contenedor de números."
        );

        return;
    }


    /* =========================================
       ELEMENTOS DEL RESUMEN
    ========================================= */

    const cantidadNumeros =
        document.getElementById("cantidadNumeros");

    const totalCompra =
        document.getElementById("totalCompra");

    const listaSeleccionados =
        document.getElementById("listaSeleccionados");

    const btnPagar =
        document.getElementById("btnPagar");

    const modalPago =
        document.getElementById("modalPago");

    const cerrarPago =
        document.getElementById("cerrarPago");

    const totalModal =
        document.getElementById("totalModal");

    const numeroNequi =
        document.getElementById("numeroNequi");

    const numerosModal =
        document.getElementById("numerosModal");

    const btnWhatsApp =
        document.getElementById("btnWhatsApp");


    /* =========================================
       NÚMEROS SELECCIONADOS
    ========================================= */

    let seleccionados = [];


    /* =========================================
       MOSTRAR NEQUI
    ========================================= */

    if (numeroNequi) {
        numeroNequi.textContent = NUMERO_NEQUI;
    }


    /* =========================================
       LIMPIAR CONTENEDOR
    ========================================= */

    contenedor.innerHTML = "";


    /* =========================================
       CREAR LOS 5.000 NÚMEROS
    ========================================= */

    const fragmento =
        document.createDocumentFragment();


    for (
        let i = 1;
        i <= TOTAL_NUMEROS;
        i++
    ) {

        const numero =
            String(i).padStart(4, "0");


        const elemento =
            document.createElement("div");


        elemento.className = "numero";


        elemento.textContent = numero;


        elemento.setAttribute(
            "data-numero",
            numero
        );


        elemento.style.display = "flex";
        elemento.style.visibility = "visible";
        elemento.style.opacity = "1";


        /* =====================================
           CLICK DEL NÚMERO
        ===================================== */

        elemento.addEventListener(
            "click",
            function () {

                seleccionarNumero(
                    numero,
                    elemento
                );

            }
        );


        fragmento.appendChild(
            elemento
        );

    }


    contenedor.appendChild(
        fragmento
    );


    console.log(
        "🎰 5.000 números creados correctamente."
    );


    /* =========================================
       SELECCIONAR / DESELECCIONAR
    ========================================= */

    function seleccionarNumero(
        numero,
        elemento
    ) {

        const posicion =
            seleccionados.indexOf(numero);


        if (posicion !== -1) {

            seleccionados.splice(
                posicion,
                1
            );

            elemento.classList.remove(
                "seleccionado"
            );

        }

        else {

            seleccionados.push(
                numero
            );

            elemento.classList.add(
                "seleccionado"
            );


            elemento.animate(
                [
                    {
                        transform:
                            "scale(.75)"
                    },

                    {
                        transform:
                            "scale(1.12)"
                    },

                    {
                        transform:
                            "scale(1.04)"
                    }
                ],
                {
                    duration: 300
                }
            );

        }


        actualizarResumen();

    }


    /* =========================================
       ACTUALIZAR RESUMEN
    ========================================= */

    function actualizarResumen() {

        const cantidad =
            seleccionados.length;


        const total =
            cantidad * PRECIO_NUMERO;


        if (cantidadNumeros) {

            cantidadNumeros.textContent =
                cantidad;

        }


        if (totalCompra) {

            totalCompra.textContent =
                formatoPesos(total);

        }


        if (listaSeleccionados) {

            if (cantidad === 0) {

                listaSeleccionados.textContent =
                    "🎟️ Selecciona uno o varios números.";

            }

            else {

                listaSeleccionados.innerHTML =
                    seleccionados
                    .map(
                        numero =>
                        `<span>🎟️ ${numero}</span>`
                    )
                    .join(" • ");

            }

        }

    }


    /* =========================================
       FORMATO DE DINERO
    ========================================= */

    function formatoPesos(valor) {

        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        ).format(valor);

    }


    /* =========================================
       BOTÓN PAGAR
    ========================================= */

    if (btnPagar) {

        btnPagar.addEventListener(
            "click",
            function () {

                if (
                    seleccionados.length === 0
                ) {

                    aviso(
                        "🎟️ Selecciona primero un número."
                    );

                    return;

                }


                const total =
                    seleccionados.length *
                    PRECIO_NUMERO;


                if (totalModal) {

                    totalModal.textContent =
                        formatoPesos(total);

                }


                if (numerosModal) {

                    numerosModal.innerHTML =
                        seleccionados
                        .map(
                            numero =>
                            `<span>🎟️ ${numero}</span>`
                        )
                        .join(" • ");

                }


                if (modalPago) {

                    modalPago.classList.add(
                        "activo"
                    );

                    document.body.style.overflow =
                        "hidden";

                }

            }
        );

    }


    /* =========================================
       CERRAR PAGO
    ========================================= */

    if (cerrarPago) {

        cerrarPago.addEventListener(
            "click",
            function () {

                cerrarModal();

            }
        );

    }


    if (modalPago) {

        modalPago.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target === modalPago
                ) {

                    cerrarModal();

                }

            }
        );

    }


    function cerrarModal() {

        if (modalPago) {

            modalPago.classList.remove(
                "activo"
            );

        }

        document.body.style.overflow = "";

    }


    /* =========================================
       📲 WHATSAPP
       BOTÓN ENVIAR COMPROBANTE
    ========================================= */

    if (btnWhatsApp) {

        btnWhatsApp.onclick = function (evento) {

            /*
               Evitar que el botón haga
               cualquier otra acción
            */

            if (evento) {
                evento.preventDefault();
                evento.stopPropagation();
            }


            /* -------------------------------
               COMPROBAR SELECCIÓN
            -------------------------------- */

            if (
                seleccionados.length === 0
            ) {

                aviso(
                    "🎟️ Selecciona tus números primero."
                );

                return false;

            }


            /* -------------------------------
               CALCULAR TOTAL
            -------------------------------- */

            const total =
                seleccionados.length *
                PRECIO_NUMERO;


            /* -------------------------------
               NÚMEROS
            -------------------------------- */

            const numeros =
                seleccionados.join(", ");


            /* -------------------------------
               MENSAJE AUTOMÁTICO
            -------------------------------- */

            const mensaje =
`🎰 *RIFA EL PATRÓN* 🇨🇴

Hola 👋 quiero participar en la rifa.

🎟️ *Números seleccionados:*
${numeros}

🔢 *Cantidad de números:*
${seleccionados.length}

💰 *Valor por número:*
$40.000 COP

💵 *TOTAL A PAGAR:*
${formatoPesos(total)}

📲 Ya realicé el pago.

Adjunto mi comprobante de pago por este medio.

Muchas gracias. 🙌🎰`;


            /* -------------------------------
               CREAR ENLACE WHATSAPP
            -------------------------------- */

            const enlaceWhatsApp =
                "https://wa.me/" +
                WHATSAPP +
                "?text=" +
                encodeURIComponent(
                    mensaje
                );


            console.log(
                "📲 Abriendo WhatsApp:",
                enlaceWhatsApp
            );


            /* -------------------------------
               ABRIR WHATSAPP
            -------------------------------- */

            window.location.href =
                enlaceWhatsApp;


            return false;

        };

    }

    else {

        console.error(
            "❌ No se encontró el botón #btnWhatsApp."
        );

    }


    /* =========================================
       AVISO
    ========================================= */

    function aviso(texto) {

        const caja =
            document.createElement("div");


        caja.textContent = texto;


        caja.style.position = "fixed";
        caja.style.top = "25px";
        caja.style.left = "50%";

        caja.style.transform =
            "translateX(-50%)";

        caja.style.width =
            "min(90%,450px)";

        caja.style.padding =
            "15px 20px";

        caja.style.textAlign =
            "center";

        caja.style.color =
            "#fff";

        caja.style.fontWeight =
            "900";

        caja.style.background =
            "linear-gradient(135deg,#111936,#080b1d)";

        caja.style.border =
            "1px solid #00ffff";

        caja.style.borderRadius =
            "18px";

        caja.style.boxShadow =
            "0 0 25px #00ffff";

        caja.style.zIndex =
            "999999";


        document.body.appendChild(
            caja
        );


        setTimeout(
            function () {

                caja.remove();

            },
            2500
        );

    }


    /* =========================================
       🎰 PARTÍCULAS CASINO
       NO SE MODIFICA EL DISEÑO
    ========================================= */

    const emojis = [
        "🎰",
        "🎟️",
        "💎",
        "💰",
        "✨",
        "⭐"
    ];


    setInterval(
        function () {

            const particula =
                document.createElement("div");


            particula.textContent =
                emojis[
                    Math.floor(
                        Math.random() *
                        emojis.length
                    )
                ];


            particula.style.position =
                "fixed";

            particula.style.left =
                Math.random() * 100 + "vw";

            particula.style.top =
                "-30px";

            particula.style.fontSize =
                "18px";

            particula.style.pointerEvents =
                "none";

            particula.style.zIndex =
                "2";


            document.body.appendChild(
                particula
            );


            particula.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",
                        opacity: .8
                    },

                    {
                        transform:
                            `translateY(${window.innerHeight + 80}px)
                             rotate(${Math.random()*700}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        5000 +
                        Math.random() * 4000
                }
            );


            setTimeout(
                function () {

                    particula.remove();

                },
                10000
            );

        },
        800
    );


});
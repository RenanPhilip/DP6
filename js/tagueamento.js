// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// TODAS AS PÁGINAS
document.addEventListener('DOMContentLoaded', function () {
    // Configuração inicial
    // window.dataLayer = window.dataLayer || [];
    URL = window.location.href

    // Page View ALL PAGES
    // dataLayer.push({
    //     'event': 'page_view',
    //     'data': {
    //         page_location: URL
    //     }
    // });
    gtag('event', 'page_view',
        {
            page_location: URL
        }
    );


    // CLICK NO MENU ENTRE EM CONTATO
    document.querySelector("body > nav > ul > li:nth-child(4)").addEventListener('click', function () {
        // dataLayer.push({
        //     'event': 'click',
        //     'data': {
        //         page_location: URL,
        //         element_name: "entre_em_contato",
        //         element_group: "menu"
        //     }
        // });
        gtag('event', 'click',
            {
                page_location: URL,
                element_name: "entre_em_contato",
                element_group: "menu"
            }
        );
    });


    // CLICK NO MENU DOWNLOAD DO PDF
    document.querySelector("body > nav > ul > li:nth-child(5)").addEventListener('click', function () {
        // dataLayer.push({
        //     'event': 'file_download',
        //     'data': {
        //         page_location: URL,
        //         element_name: "download_pdf",
        //         element_group: "menu"
        //     }
        // });
        gtag('event', 'file_download',
            {
                page_location: URL,
                element_name: "download_pdf",
                element_group: "menu"
            }
        );

    });
});

// Página analise.html
document.addEventListener('DOMContentLoaded', function () {
    if (URL.includes("/analise")) {

        // CLICK NOS CARDS 'LOREM IPSUM DOLOR'
        //@ Outra possivel solução é usando o for, caso cards variem em quantidade em algumas páginas (poderia ser usado um foreach também)
        //@ O forEach foi usado no formulário, como exemplo de uso

        let cards = document.getElementsByClassName('card card-montadoras')
        for (var i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', function () {
                // dataLayer.push({
                //     'event': 'click',
                //     'data': {
                //         page_location: URL,
                //         element_name: this.dataset.name.toLowerCase(),  // Padroniza o valor do data-name para minúsculo
                //         element_group: "ver_mais"
                //     }
                // });
                gtag('event', 'click',
                    {
                        page_location: URL,
                        element_name: this.dataset.name.toLowerCase(),  // Padroniza o valor do data-name para minúsculo
                        element_group: "ver_mais"
                    }
                )
            })
        }
    }
});

// Página sobre.html
document.addEventListener('DOMContentLoaded', function () {
    if (URL.includes("/sobre")) {
        // Event Name: form_submit
        // Parâmetros:
        // page_location: [url da página]
        // form_id: [atributo de ID HTML do elemento DOM <form>]
        // form_name: [atributo de nome HTML do elemento DOM <form>]
        // form_destination: [URL para onde o formulário está sendo enviado]
        // form_submit_text: [texto do botão de envio]

        // Todos os campos do formulário
        let form_contato = document.querySelector("body > main > section > form");
        let form_id = document.querySelector("#contato").id;
        let form_name = form_contato.name || form_id;
        let form_submit_text = form_contato.innerText.split('\n').pop();
        let form_destination = form_contato.action;    // Usa o action do form ou um valor padrão


        // Seleciona os campos específicos do formulário para adicionar o evento de preenchimento (blur)
        let campos = [
            document.querySelector("#nome"),
            document.querySelector("#email"),
            document.querySelector("#telefone")
        ]

        // Adiciona o evento de 'blur' em cada campo. O 'blur' (quando o campo perde o foco), foi utilizado para que assim podemos pegar o preenchimento se precisarmos
        // Preenchimento do formulário (evento de 'blur' em cada campo)
        campos.forEach((campo) => {
            campo.addEventListener('blur', () => {
                // dataLayer.push({
                //     'event': 'form_start',
                //     'data': {
                //         page_location: URL,
                //         form_id: form_id,
                //         form_name: campo.form.name || campo.id,
                //         form_destination: form_destination
                //     }
                // });
                gtag('event', 'form_start',
                    {
                        page_location: URL,
                        form_id: form_id,
                        form_name: campo.form.name || campo.id,
                        form_destination: form_destination
                    }
                );
            })
        })


        // Envio do formulário clicando no botão submit
        form_contato.addEventListener('submit', function () {
            // dataLayer.push({
            //     'event': 'form_submit',
            //     'data': {
            //         page_location: URL,
            //         form_id: form_id,
            //         form_name: form_name,
            //         form_destination: form_destination,
            //         form_submit_text: form_submit_text
            //     }
            // });
            gtag('event', 'form_submit',
                {
                    page_location: URL,
                    form_id: form_id,
                    form_name: form_name,
                    form_destination: form_destination,
                    form_submit_text: form_submit_text
                }
            );
        });

        // Visualização do formulário de sucesso (lightbox)
        // Como o formulário de sucesso abre em um lightbox, vamos observar mudanças na classe do body para detectar quando o lightbox é aberto
        const observer = new MutationObserver(() => {
            if (document.body.classList.contains("lightbox-open")) {
                //console.log("Lightbox abriu!");
                // dataLayer.push({
                //     'event': 'view_form_success',
                //     'data': {
                //         page_location: URL,
                //         form_id: form_id,
                //         form_name: form_name
                //     }
                // });
                gtag('event', 'view_form_success',
                    {
                        page_location: URL,
                        form_id: form_id,
                        form_name: form_name
                    }
                );
            } else {
                return false
            }

        });

        // Observa mudanças nos atributos da <body>
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"]
        });


    }
});
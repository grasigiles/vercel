$("#resultado").click(function (e) {    
    $('#aviso').css('display', 'none');
    var list = "";
    var total = 0;

    if ($("#nome").val() == "") { $('#aviso').css('display', 'block').html('Preencha o campo nome').css('color', 'red'); return;}
    if (!isValidEmail($("#email").val())) { $('#aviso').css('display', 'block').html('Preencha o campo e-mail').css('color', 'red'); return; }


    $(":checkbox:checked").each(function (e) {
        list += $(this).val() + ",";
        total += 1;
    });

    if (list == "" || total < 15) { $('#aviso').css('display', 'block').html('Selecione pelo menos 15 tipos de personalidades').css('color', 'red'); return;}
        
    submit(list);
});

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

function submit(list) {
    
    list = list.substr(0, list.length - 1);
    var nome = $('#nome').val();
    var email = $('#email').val();

    $.ajax({
        url: '/MeuEstilo/Gravar?personalidades=' + list + '&nome=' + nome + '&email=' + email,
        format: 'JSON',
        method: 'POST',
        contentType: "application/json; utf-8",
        beforeSend: function () {
            $('#aviso').css('display', 'block').html('Processando sua análise, por favor aguarde...').css('color', 'black');
        },
        success: function (data) {
            if (data.Success)
                window.location.href = "/MeuEstilo/Resultado?c=" + data.Email;
        },
        error: function (erro) {
            $('#aviso').css('display', 'block').html('Ocorreu um erro, por favor tente novamente').css('color', 'red');
        }
    });
}

$("#js-wizard-form").validate({
    ignore: 'input[type=hidden], .select2-search__field',
    errorClass: 'validation-error-label',
    successClass: 'validation-valid-label',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    rules: {
        nome: { required: true },        
        email: { required: true, email: true }
    },
    messages: {
        nome: "Campo obrigatório",
        email: "E-mail inválido"
    }
});

$("#voltar").click(function (e) {
    $('#aviso').css('display', 'none');    
});

$("#codigo-ativacao-avancar").click(function (e) {
    
    if ($("#codigo-ativacao").val() == "") {        
        $('#aviso-codigo-ativacao').css('display', 'block');
        return;
    }
    else {        
        $('#aviso-codigo-ativacao').css('display', 'none');

        $.ajax({
            url: '/MeuEstilo/ValidarCodigoAtivacao?codigoAtivacao=' + $('#codigo-ativacao').val(),
            format: 'JSON',
            method: 'GET',
            contentType: "application/json; utf-8",        
            success: function (data) {
                if (data.Success) {
                    $('#aviso-codigo-ativacao').css('display', 'none');
                    $("#avancar-tab1").trigger("click");
                }   
                else
                    $('#aviso-codigo-ativacao').css('display', 'block');
            },
            error: function (erro) {
                $('#aviso-codigo-ativacao').css('display', 'none');
            }
        });        
    }
    
});



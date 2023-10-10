$("#submit").click(function (e) {
    if ($("#form-contato").valid()) {
        e.preventDefault();
        submit();
    }
});

function submit() {
    var email = {
        titulo: $("#titulo").html(),
        nome: $("#nome").val(),
        email: $("#email").val(),
        telefone: $("#telefone").val(),
        mensagem: $("#mensagem").val()
    }

    $.ajax({
        url: '/Contato/Mensagem/',
        format: 'JSON',
        method: 'POST',
        contentType: "application/json; utf-8",
        data: JSON.stringify(email),
        beforeSend: function () {
            $("#aviso").html("Enviando sua mensagem...");
        },
        success: function (data) {
            if (data.Success) {
                $("#aviso").html("Mensagem enviada com sucesso");
                $("#nome").val('');
                $("#telefone").val('');
                $("#mensagem").val('');
            }
            else {
                $("#aviso").html("Ocorreu um erro, por favor tente novamente");
            }
        },
        error: function (erro) {
            $("#aviso").html("Ocorreu um erro, por favor tente novamente");
        }
    });
}

// validacao form
$("#form-contato").validate({
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
        telefone: { required: true },        
        email: { email: true }        
    },
    messages: {
        nome: "Campo obrigatório",
        telefone: "Campo obrigatório",
        email: "E-mail inválido"
    }
});
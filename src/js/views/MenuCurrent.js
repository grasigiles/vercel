$(document).ready(function () {
    $("#menu-servicos").removeClass("current");
    $("#menu-consultoria-completa").removeClass("current");
    $("#menu-palestras").removeClass("current");
    $("#menu-workshop").removeClass("current");
    $("#menu-sobre").removeClass("current");
    $("#menu-contato").removeClass("current");
    $("#menu-home").removeClass("current");

    var url = window.location.pathname;
    if (url.indexOf("servicos") >= 0 && url.indexOf("consultoriacompletadeestilo") == -1) {
        $("#menu-servicos").addClass("current")
        if (url.indexOf("analisedecoloracaopessoal") >= 0)
            $("#carrosel-coloracao-pessoal").remove();
        else if (url.indexOf("analisedeguardaroupa") >= 0)
            $("#carrosel-analise-de-guarda-roupas").remove();
        else if (url.indexOf("criacaodelooks") >= 0)
            $("#carrosel-criacao-de-looks").remove();
        else if (url.indexOf("personalshopper") >= 0)
            $("#carrosel-personal-shopper").remove();
        else if (url.indexOf("analisedeestilo") >= 0)
            $("#carrosel-analise-de-estilo").remove();
        else if (url.indexOf("fastconsultoria") >= 0)
            $("#carrosel-fast-consultoria").remove();
        else if (url.indexOf("malaplanejada") >= 0)
            $("#carrosel-mala-planejada").remove();        
    }        
    else if (url.indexOf("consultoriacompletadeestilo") >= 0)
        $("#menu-consultoria-completa").addClass("current")
    else if (url.indexOf("palestras") >= 0)
        $("#menu-palestras").addClass("current")
    else if (url.indexOf("workshop") >= 0)
        $("#menu-workshop").addClass("current")
    else if (url.indexOf("sobre") >= 0)
        $("#menu-sobre").addClass("current")
    else if (url.indexOf("contato") >= 0)
        $("#menu-contato").addClass("current")
    else 
        $("#menu-home").addClass("current")   
});
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using System.Text;

namespace Site.Custom
{
    public class SendEmail
    {
        const string chave = "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";

        public static async Task AnaliseDeEstilo(string link, string email, string nome)
        {
            try
            {
                var client = new SendGridClient(chave);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("grasipersonal@gmail.com", "Resultado Teste de Estilo"),
                    Subject = "Resultado Teste de Estilo",
                    PlainTextContent = "Resultado Teste de Estilo",
                    HtmlContent = "Olá "+ nome + "<br><br>Parabéns pela descoberta, através do link abaixo você pode acessar resultado do seu Teste de Estilo <br><br><a href='" + link + "'>" + link + "</a><br><br>Quer saber como se tornar mais estilosa? Siga <br><a href='https://www.instagram.com/grasipersonalstylist/'>@grasipersonalstylist</a><br><a href='https://grasipersonalstylist.com.br'>www.grasipersonalstylist.com.br</a>"
                };
                msg.AddTo(new EmailAddress(email));
                msg.AddBcc(new EmailAddress("grasipersonaltesteestilo@gmail.com"));
                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                ;
            }
            
        }

        public static async Task Contato(
            string titulo,
            string nome,
            string email,
            string telefone,
            string mensagem)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.Append(titulo);
                sb.Append("<br>");
                sb.Append(nome);
                sb.Append("<br>");
                sb.Append(email == null || email == "" ? "Email não informado" : email);
                sb.Append("<br>");
                sb.Append(telefone);
                sb.Append("<br>");
                sb.Append(mensagem == null || mensagem == "" ? "Mais detalhes não informado" : mensagem);
                sb.Append("<br>");

                var client = new SendGridClient(chave);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("luciano.giles@gmail.com", "Solicitação de contato"),
                    Subject = "Solicitação de contato",
                    PlainTextContent = "Solicitação de contato",
                    HtmlContent = sb.ToString()
                };
                msg.AddTo(new EmailAddress("grasipersonal@gmail.com"));
                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                ;
            }

        }
    }
}
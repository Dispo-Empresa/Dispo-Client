using System.Globalization;

namespace Dispo.Commom.Extensions
{
    public static class DecimalExtension
    {
        public static string ConverterParaReal(this decimal valorDecimal)
        {
            // Definir o número de casas decimais desejado
            int numeroCasasDecimais = 2;

            // Criar uma instância da cultura brasileira (BRL)
            CultureInfo culturaBRL = new CultureInfo("pt-BR");

            // Definir o formato da moeda brasileira
            NumberFormatInfo formatoMoedaBRL = culturaBRL.NumberFormat;
            formatoMoedaBRL.CurrencyDecimalDigits = numeroCasasDecimais;
            formatoMoedaBRL.CurrencyDecimalSeparator = ",";
            formatoMoedaBRL.CurrencyGroupSeparator = ".";
            formatoMoedaBRL.CurrencySymbol = "R$";

            // Converter o valor decimal para string usando a formatação de moeda brasileira
            string valorEmReal = valorDecimal.ToString("C", formatoMoedaBRL);

            return valorEmReal;
        }
    }
}

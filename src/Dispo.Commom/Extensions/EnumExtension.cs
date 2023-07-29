namespace Dispo.Commom.Extensions
{
    public class EnumExtension
    {
        public static T ConvertToEnum<T>(string value, T defaultValue) where T : struct, IConvertible
        {
            return Enum.TryParse<T>(value, out var outputValue) ? outputValue : defaultValue;
        }

        public static string ConvertToString<T>(T type) where T : struct, IConvertible
        {
            string? outputValue = Enum.GetName(typeof(T), type);

            return outputValue != null ? outputValue : string.Empty;
        }
    }
}
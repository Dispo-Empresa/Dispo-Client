namespace Dispo.Commom
{
    public static class ExtensionHelpers
    {
        public static long ToLong(this long value)
            => value.IsIdInvalid() || value == null ? IDHelper.INVALID_ID : value;

        public static bool IsListWithItens<T>(this List<T> list)
            => list.Count > 0;
    }
}
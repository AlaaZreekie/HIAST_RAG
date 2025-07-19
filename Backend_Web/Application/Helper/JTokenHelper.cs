using Newtonsoft.Json.Linq;

namespace Application.Helper
{
    public static class JTokenHelper
    {
        public static JToken RemoveEmptyChildrenAndFilterByFields(this JToken token, IList<string> jsonFields, int level = 1)
        {
            if (token.Type == JTokenType.Object)
            {
                var copy = new JObject();

                foreach (var prop in token.Children<JProperty>())
                {
                    var child = prop.Value;

                    if (child.HasValues)
                    {
                        child = child.RemoveEmptyChildrenAndFilterByFields(jsonFields, level + 1);
                    }

                    var allowedFields = jsonFields.Contains(prop.Name.ToLowerInvariant()) || level > 3;
                    var notEmpty = !child.IsEmptyOrDefault() || level == 1 || level == 3;

                    if (notEmpty && allowedFields)
                    {
                        copy.Add(prop.Name, child);
                    }
                }

                return copy;
            }

            if (token.Type == JTokenType.Array)
            {
                var copy = new JArray();

                foreach (var item in token.Children())
                {
                    var child = item;

                    if (child.HasValues)
                    {
                        child = child.RemoveEmptyChildrenAndFilterByFields(jsonFields, level + 1);
                    }

                    if (!child.IsEmptyOrDefault())
                    {
                        copy.Add(child);
                    }
                }

                return copy;
            }

            return token;
        }

        private static bool IsEmptyOrDefault(this JToken token)
        {
            return token.Type == JTokenType.Array && !token.HasValues || token.Type == JTokenType.Object && !token.HasValues;
        }
    }
}
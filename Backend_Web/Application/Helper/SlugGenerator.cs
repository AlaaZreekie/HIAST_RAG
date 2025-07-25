using Domain.Ennum;
using System.Text.RegularExpressions;

namespace Application.Common.Utilities
{
    /// <summary>
    /// Provides static methods for generating URL-friendly slugs.
    /// </summary>
    public static class SlugGenerator
    {
        /// <summary>
        /// Generates a complete, language-prefixed slug from a title and a language code.
        /// Example: ("About Us", LanguageCodeEnum.en) -> "en/about-us"
        /// </summary>
        /// <param name="title">The source title to slugify.</param>
        /// <param name="languageCode">The language code to prefix the slug with.</param>
        /// <returns>A composite slug string.</returns>
        public static string Generate(string title, LanguageCodeEnum languageCode)
        {
            var titleSlug = Slugify(title);
            var langCodeString = languageCode.ToString().ToLowerInvariant();

            return $"{langCodeString}/{titleSlug}";
        }

        /// <summary>
        /// Converts a given string (including Arabic) into a URL-friendly slug.
        /// Example: "My Awesome Title!" -> "my-awesome-title"
        /// Example: "شؤون الطلاب" -> "شؤون-الطلاب"
        /// </summary>
        /// <param name="phrase">The string to convert.</param>
        /// <returns>A URL-friendly slug.</returns>
        public static string Slugify(string phrase)
        {
            if (string.IsNullOrWhiteSpace(phrase))
                return string.Empty;

            // 1. Convert to lower case (only affects Latin characters)
            string str = phrase.ToLowerInvariant();

            // 2. **MODIFIED REGEX**: Remove invalid characters. 
            // This now keeps letters (a-z), numbers (0-9), Arabic letters (\p{IsArabic}), spaces, and hyphens.
            str = Regex.Replace(str, @"[^a-z0-9\p{IsArabic}\s-]", "");

            // 3. Convert multiple spaces into a single space
            str = Regex.Replace(str, @"\s+", " ").Trim();

            // 4. Replace spaces with hyphens
            str = str.Replace(" ", "-");

            // 5. Ensure no double-hyphens
            str = Regex.Replace(str, @"-+", "-");

            return str;
        }
    }
}
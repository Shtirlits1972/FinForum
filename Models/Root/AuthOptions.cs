using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FinForum.Models.Root
{
    public class AuthOptions
    {
        public const string ISSUER = "FinServer"; // издатель токена
        public const string AUDIENCE = "FinForum"; // потребитель токена
        const string KEY = "XNNd866G8Oitrr6r4UUnf230SCi7Ia9dOe9";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}

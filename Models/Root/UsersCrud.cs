using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace FinForum.Models.Root
{
    public class UsersCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<Users> GetAll()
        {
            List<Users> list = new List<Users>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Users>("SELECT Id, email, pass, [role], userFio, isBanned FROM Users;").ToList();
            }

            return list;
        }
        public static Users GetOne(int Id)
        {
            Users model = null;

            using (IDbConnection db = new SqlConnection(strConn))
            {
                model = db.Query<Users>("SELECT Id, email, pass, [role], userFio, isBanned FROM Users WHERE Id = @Id;", new { Id }).FirstOrDefault();
            }

            return model;
        }
        public static Users Login(string Email, string Pass)
        {
            Users model = null;

            using (IDbConnection db = new SqlConnection(strConn))
            {
                model = db.Query<Users>("SELECT TOP 1 Id, email, pass, [role], userFio, isBanned FROM Users WHERE Email = @Email AND Pass = @Pass AND IsBanned = 0;", new { Email, Pass }).FirstOrDefault();
            }

            return model;
        }
        public static void Del(int Id)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                db.Execute("DELETE FROM Users WHERE Id = @Id;", new { Id });
            }
        }
        public static void Update(Users model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "UPDATE Users SET email = @email, pass = @pass, role = @role, userFio = @userFio, isBanned = @isBanned  WHERE Id = @Id;";
                db.Execute(Query, model);
            }
        }
        public static Users Insert(Users model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "INSERT INTO Users (email, pass, [role], userFio, isBanned) VALUES(@email, @pass, @role, @userFio, @isBanned); SELECT CAST(SCOPE_IDENTITY() as int)";
                int Id = db.Query<int>(Query, model).FirstOrDefault();
                model.Id = Id;
            }

            return model;
        }
    }
}

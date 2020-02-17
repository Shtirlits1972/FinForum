using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using FinForum.Models.Root;

namespace FinForum.Models.TopicF
{
    public class TopicCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<Topic> GetAll(string strLike = "")
        {
            List<Topic> list = new List<Topic>();
            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Topic>("SELECT Id, Title, [Text], AuthorId, userFio, DataCreate FROM TopicView WHERE Title LIKE '%' + @strLike + '%' OR[Text] LIKE '%' + @strLike + '%';", new { strLike }).ToList();
            }

            return list;
        }
        public static Topic GetOne(int Id)
        {
            Topic model = null;

            using (IDbConnection db = new SqlConnection(strConn))
            {
                model = db.Query<Topic>("SELECT Id, Title, [Text], AuthorId, userFio, DataCreate FROM TopicView WHERE Id = @Id;", new { Id }).FirstOrDefault();
            }

            return model;
        }
        public static void Del(int Id)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                db.Execute("DELETE FROM Topic WHERE Id = @Id;", new { Id });
            }
        }
        public static void Update(Topic model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "UPDATE Topic SET Title = @Title, Text = @Text, AuthorId = @AuthorId, DataCreate = @DataCreate  WHERE Id = @Id;";
                db.Execute(Query, model);
            }
        }
        public static Topic Insert(Topic model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "INSERT INTO Topic (Title, [Text], AuthorId, DataCreate) VALUES(@Title, @Text, @AuthorId, @DataCreate); SELECT CAST(SCOPE_IDENTITY() as int)";
                int Id = db.Query<int>(Query, model).FirstOrDefault();
                model.Id = Id;
            }

            return model;
        }
    }
}

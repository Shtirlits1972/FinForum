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
        public static List<Topic> GetAll(string strLike = "", string ForumPart = "Главный")
        {
            List<Topic> list = new List<Topic>();
            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Topic>("SELECT Id, Title, [Text], AuthorId, userFio, DataCreate, ForumPart FROM TopicView WHERE (Title LIKE '%' + @strLike + '%' OR[Text] LIKE '%' + @strLike + '%') AND ((@ForumPart = '') OR ((ForumPart = @ForumPart) AND (ForumPart != '')));", new { strLike, ForumPart }).ToList();
            }

            return list;
        }
        public static Topic GetOne(int Id)
        {
            Topic model = null;

            using (IDbConnection db = new SqlConnection(strConn))
            {
                model = db.Query<Topic>("SELECT Id, Title, [Text], AuthorId, userFio, DataCreate, ForumPart FROM TopicView WHERE Id = @Id;", new { Id }).FirstOrDefault();
            }

            return model;
        }
        public static void Del(int Id)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                db.Execute("DELETE FROM Messagess WHERE TopicId = @Id ; DELETE FROM Topic WHERE Id = @Id;", new { Id });
            }
        }
        public static void Update(Topic model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "UPDATE Topic SET Title = @Title, Text = @Text, AuthorId = @AuthorId, DataCreate = @DataCreate, ForumPart = @ForumPart  WHERE Id = @Id;";
                db.Execute(Query, model);
            }
        }
        public static Topic Insert(Topic model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "INSERT INTO Topic (Title, [Text], AuthorId, DataCreate, ForumPart) VALUES(@Title, @Text, @AuthorId, @DataCreate, @ForumPart); SELECT CAST(SCOPE_IDENTITY() as int)";
                int Id = db.Query<int>(Query, model).FirstOrDefault();
                model.Id = Id;
            }

            return model;
        }

        public static forum[] GetForumList()
        {
            forum[] array = new  forum [3];

            array[0] = new forum { values = "Главный" };
            array[1] = new forum { values = "Безлимитный" };
            array[2] = new forum { values = "Вакансии" };

            return array;
        }

        public struct forum
        {
            public string values { get; set; }
        }

    }
}

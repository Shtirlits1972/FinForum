using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using FinForum.Models.Root;

namespace FinForum.Models.TopicF
{
    public class MessagessCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<Messagess> GetByTopicId(int TopicId)
        {
            List<Messagess> list = new List<Messagess>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Messagess>("SELECT Id, TopicId, AuthorName, ParentMessageId, [Text], DataMess FROM Messagess WHERE TopicId = @TopicId;", new { TopicId }).ToList();
            }

            return list;
        }

        public static Messagess GetOne(int Id)
        {
            Messagess model = null;

            using (IDbConnection db = new SqlConnection(strConn))
            {
                model = db.Query<Messagess>("SELECT Id, TopicId, AuthorName, ParentMessageId, [Text], DataMess FROM Messagess WHERE Id = @Id;", new { Id }).FirstOrDefault();
            }

            return model;
        }

        public static void Del(int Id)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                db.Execute("DELETE FROM Messagess WHERE Id = @Id;", new { Id });
            }
        }
        public static void Update(Messagess model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "UPDATE Messagess SET TopicId = @TopicId, AuthorName = @AuthorName, ParentMessageId = @ParentMessageId, [Text] = @Text, DataMess = @DataMess  WHERE Id = @Id;";
                db.Execute(Query, model);
            }
        }
        public static Messagess Insert(Messagess model)
        {
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var Query = "INSERT INTO Messagess (TopicId, AuthorName, ParentMessageId, [Text], DataMess ) VALUES(@TopicId, @AuthorName, @ParentMessageId, @Text, @DataMess ); SELECT CAST(SCOPE_IDENTITY() as int)";
                int Id = db.Query<int>(Query, model).FirstOrDefault();
                model.Id = Id;
            }

            return model;
        }
    }
}
// 


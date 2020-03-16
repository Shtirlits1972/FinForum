using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.TopicF
{
    public class Topic
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";   
        public string Text { get; set; } = "";
        public int AuthorId { get; set; }
        public string userFio { get; set; } = "";
        public DateTime DataCreate { get; set; }
        public string ForumPart { get; set; } = "Главный";
        public List<Messagess> listMessages { get; set; } = new List<Messagess>();
        public override string ToString()
        {
            return Title;
        }
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.TopicF
{
    public class Messagess
    {
        public int Id {get; set;}
        public int TopicId { get; set;}
        public string AuthorName { get; set;}
        public int ParentMessageId { get; set;}
        public string Text { get; set;}
        public DateTime DataMess {get; set;}
        public override string ToString()
        {
            return Text;
        }

    }
}

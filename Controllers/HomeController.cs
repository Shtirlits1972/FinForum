using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FinForum.Models;
using Microsoft.AspNetCore.Authorization;
using FinForum.Models.TopicF;
using FinForum.Models.ReportsQ;

namespace FinForum.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(string id="Главный")
        {
            ViewBag.ForumPart = id;
            return View();
        }
        public JsonResult GetMessagesByTopicId(int TopicId)
        {
            List<Messagess> list = MessagessCrud.GetByTopicId(TopicId);
            return Json(list);
        }
        [HttpPost]
        public IActionResult AddMessagess(int TopicId, int MessagesId, string TextMess)
        {
            try
            {
                string AuthorName = "аноним";

                if (User.Identity.IsAuthenticated)
                {
                    int intUserId = int.Parse(User.Claims.ToList()[0].Value);
                    AuthorName = User.Claims.ToList()[1].Value;
                }

                DateTime date = DateTime.Now;

                Messagess model = new Messagess {  ParentMessageId = MessagesId, TopicId = TopicId, Text = TextMess, DataMess = date, AuthorName = AuthorName };

                model = MessagessCrud.Insert(model);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        public IActionResult AddTopic(string Title, string Text, string ForumPart)
        {
            try
            {
                int intUserId = int.Parse(User.Claims.ToList()[0].Value);
                string userFio = User.Claims.ToList()[1].Value;

                DateTime date = DateTime.Now;

                Topic topic = new Topic { Title = Title, Text = Text, DataCreate = date, AuthorId = intUserId, userFio = userFio, ForumPart = ForumPart };

                topic = TopicCrud.Insert(topic);
                return Ok(topic);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        public int getTopicQty(string strLike="", string ForumPart = "Главный")
        {
            List<Topic> list = TopicCrud.GetAll(strLike, ForumPart);
            return list.Count;
        }
        public JsonResult GetData(int page = 1, int take = 5, string strLike = "", string ForumPart = "Главный")
        {
            if(strLike == null)
            {
                strLike = "";
            }

            if(String.IsNullOrEmpty(ForumPart))
            {
                ForumPart = "";
            }

            int intSkip = (page - 1) * take;

            int intLength = TopicCrud.GetAll(strLike, ForumPart).Count;

            List<Topic> list = TopicCrud.GetAll(strLike, ForumPart).OrderByDescending(x => x.DataCreate).Skip(intSkip).Take(take).ToList();

            for(int i=0; i< list.Count; i++)
            {
                list[i].listMessages = MessagessCrud.GetByTopicId(list[i].Id);
            }

            var dataComplex = new {
                intLength = intLength,
                list = list
            };

            return Json(dataComplex);
        }
        [HttpPost]
        public void Del(int Id)
        {
            TopicCrud.Del(Id);
        }
        public JsonResult GetForumList()
        {
            TopicCrud.forum[] array = TopicCrud.GetForumList();
            return Json(array);
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

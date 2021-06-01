using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MessageBoard.Controllers
{



    [Route("api/message-board")]
    [ApiController]
    public class MessageBoardController : ControllerBase
    {

        //Normally I would store these data in database and setup conneciton string in appSettings.json
        //but for demo purpose everything is stored in memory
        public static List<BoardMessage> _boardMessages = new List<BoardMessage>();

        // GET: api/<MessageBoardController>
        [HttpGet]
        [Route("get-messages")]
        public IActionResult getAllBoardMessages()
        {


            return Ok(new { messages = _boardMessages });
        }


        [HttpPost]
        [Route("send-message")]
        public IActionResult sendMessage(BoardMessage payload)
        {
            _boardMessages.Add(payload);

            return Ok();
        }

        //POST data is encrypted and does not leak in any other way. So insted of put i preffer Post request
        [HttpPost]
        [Route("reset-messages")]
        public IActionResult resetAllMessages()
        {
            _boardMessages = new List<BoardMessage>();

            return Ok();
        }





    }
}

public class BoardMessage
{
    public string subject { get; set; }
    public string message { get; set; }
}

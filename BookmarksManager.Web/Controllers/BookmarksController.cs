using BookmarksManager.Data;
using BookmarksManager.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookmarksManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookmarksController : ControllerBase
    {
        private readonly string _conStr;

        public BookmarksController(IConfiguration configuration)
        {
            _conStr = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getTopBookmarks")]
        [AllowAnonymous]
        public List<BookmarkCount> GetTopBookmarks(int amount)
        {
            return new BookmarkRepository(_conStr).GetBookmarksAndCounts(amount);
        }

        [HttpGet("getForUser")]
        public List<Bookmark> Get() => new BookmarkRepository(_conStr).Get(GetCurrentUserId());

        //shld check that user owns this bookmark...

        [HttpPost("add")]
        public void Insert(Bookmark bookmark)
        {
            bookmark.UserId = GetCurrentUserId();
            new BookmarkRepository(_conStr).Insert(bookmark);
        }

        [HttpPost("delete")]
        public void Delete(BookmarkIdModel idModel)
        {
            new BookmarkRepository(_conStr).Delete(idModel.Id);
        }

        [HttpPost("updateTitle")]
        public void UpdateTitle(BookmarkTitleModel bookmarkTitle) 
        {
            new BookmarkRepository(_conStr).UpdateTitle(bookmarkTitle.Id, bookmarkTitle.Title);
        }

        private int GetCurrentUserId() => new UserRepository(_conStr).GetByEmail(User.Identity.Name).Id; 

    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarksManager.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Bookmark> GetAll()
        {
            using var context = new BookmarksDataContext(_connectionString);
            return context.Bookmarks.ToList();
        }

        public List<Bookmark> Get(int userId)
        {
            using var context = new BookmarksDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }

        public void Insert(Bookmark bookmark)
        {
            using var context = new BookmarksDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public void UpdateTitle(int id, string title)
        {
            using var context = new BookmarksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

        public void Delete(int id)
        {
            using var context = new BookmarksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }

        public List<BookmarkCount> GetBookmarksAndCounts(int limit)
        {
            using var context = new BookmarksDataContext(_connectionString);
            var result = new List<BookmarkCount>();
            return context.Bookmarks
                .GroupBy(b => b.Url)
                .OrderByDescending(b => b.Count())
                .Take(limit)
                .Select(b => new BookmarkCount { Url = b.Key, Count = b.Count() })
                .ToList();
        }
    }
}

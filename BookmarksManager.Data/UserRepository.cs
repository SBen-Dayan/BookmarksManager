using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarksManager.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(User user, string password)
        {
            user.HashPassword = BCrypt.Net.BCrypt.HashPassword(password);
            using var context = new BookmarksDataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string email, string password) 
        {
            var user = GetByEmail(email);
            return user == null ? null : (BCrypt.Net.BCrypt.Verify(password, user.HashPassword) ? user : null);
            // return user ?? (BCrypt.Net.BCrypt.Verify(password, user.HashPassword) ? user : null);
            // not a short circut operator...

        }

        public User GetByEmail(string email)
        {
            using var context = new BookmarksDataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

    }
}

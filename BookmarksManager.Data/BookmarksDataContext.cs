using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace BookmarksManager.Data;

public class BookmarksDataContext : DbContext
{
    private readonly string _connectionString;

    public BookmarksDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    public DbDataReader DataReader { get; set; }

    public DbSet<User> Users { get; set; }
    public DbSet<Bookmark> Bookmarks { get; set; }
}
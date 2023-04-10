using Licenta.Models;
using Licenta.Settings;
using MongoDB.Driver;

namespace Licenta.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _stocksDB;

        public UserService(IMongoDBSettings mongoDBSettings)
        {
            var client = new MongoClient(mongoDBSettings.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.DatabaseName);

            _stocksDB = database.GetCollection<User>(mongoDBSettings.UserCollectionName);
        }

        public async Task<bool> Create(User model)
        {
            var user = await _stocksDB.FindAsync(item => item.UserName == model.UserName || item.Email == model.Email);
            if (user.ToList().Count == 0)
            {
                await _stocksDB.InsertOneAsync(model);
                return true;
            }
            else
            {
                return false;
            }
        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Get(string username)
        {
            var user = await _stocksDB.FindAsync(item => item.UserName == username);
            return user.ToList().FirstOrDefault() ?? new User();
        }

        public Task<List<User>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(string symbol, User model)
        {
            throw new NotImplementedException();
        }
    }
}

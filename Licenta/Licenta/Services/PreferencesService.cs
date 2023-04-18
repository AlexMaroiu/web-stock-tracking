using Licenta.Models;
using Licenta.Settings;
using MongoDB.Driver;

namespace Licenta.Services
{
    public class PreferencesService : IPreferencesService
    {
        private readonly IMongoCollection<Preferences> _stocksDB;

        public PreferencesService(IMongoDBSettings mongoDBSettings)
        {
            var client = new MongoClient(mongoDBSettings.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.DatabaseName);

            _stocksDB = database.GetCollection<Preferences>(mongoDBSettings.PreferencesCollectionName);
        }
        public async Task<bool> Create(Preferences? model)
        {
            if (model is null)
            {
                return false;
            }
            await _stocksDB.InsertOneAsync(model);
            return true;
        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Preferences?> Get(string id)
        {
            var preference = await _stocksDB.FindAsync(pref => pref.UserId == id);
            return preference.ToList().FirstOrDefault();
        }

        public Task<List<Preferences?>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(string symbol, Preferences? model)
        {
            var t = await _stocksDB.FindAsync(item => item.UserId == symbol);
            var t1 = t.FirstOrDefault();
            var result = await _stocksDB!.ReplaceOneAsync(filter: item => item!.UserId == symbol, model);
            if (result.IsAcknowledged && result.ModifiedCount is 0)
            {
                return false;
            }
            return true;
        }
    }
}

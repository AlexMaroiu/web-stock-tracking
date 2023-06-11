using Licenta.Models;

namespace Licenta.Services
{
    public interface IAnalysisService
    {
        AnalysisDTO Analyze(Stock stock, PreferencesDTO preference);
    }
}

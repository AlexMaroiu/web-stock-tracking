using Licenta.Models;

namespace Licenta.Services
{
    public interface IAnalysisService
    {
        AnalysisDTO Analyze(StockModel stock, PreferencesDTO preference);

        AnalysisDTO[] Compare(StockModel[] stocks);
    }
}

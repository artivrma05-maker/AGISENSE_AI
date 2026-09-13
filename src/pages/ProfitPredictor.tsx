import { useState } from "react";
import { TrendingUp, Calculator, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfitPredictor() {
  const navigate = useNavigate();

  const [crop, setCrop] = useState("Wheat");
  const [land, setLand] = useState("");
  const [cost, setCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [yieldAmount, setYieldAmount] = useState("");

  const [result, setResult] = useState<{
    revenue: number;
    profit: number;
    margin: number;
  } | null>(null);

  const calculateProfit = () => {
    const landValue = Number(land);
    const costValue = Number(cost);
    const priceValue = Number(sellingPrice);
    const yieldValue = Number(yieldAmount);

    if (
      !landValue ||
      !costValue ||
      !priceValue ||
      !yieldValue ||
      landValue < 0 ||
      costValue < 0 ||
      priceValue < 0 ||
      yieldValue < 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const revenue = yieldValue * priceValue;
    const profit = revenue - costValue;
    const margin =
      revenue > 0 ? (profit / revenue) * 100 : 0;

    setResult({
      revenue,
      profit,
      margin,
    });
  };

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="pt-6 pb-5">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-sm text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Profit Predictor
              </h1>

              <p className="text-sm text-muted-foreground">
                Estimate your crop revenue and profit
              </p>
            </div>

          </div>
        </div>

        {/* Information */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-5">

          <h2 className="font-bold text-primary">
            Farm Profit Estimation
          </h2>

          <p className="text-xs text-muted-foreground mt-1 leading-5">
            Enter your estimated crop production, selling price
            and farming cost to calculate expected revenue and profit.
          </p>

        </div>

        {/* Calculator */}
        <div className="bg-card border rounded-2xl p-4 shadow-card space-y-4">

          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />

            <h2 className="font-bold text-lg">
              Enter Farm Details
            </h2>
          </div>

          {/* Crop */}
          <div>
            <label className="text-sm font-semibold">
              Crop
            </label>

            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl border bg-background"
            >
              <option>Wheat</option>
              <option>Rice</option>
              <option>Maize</option>
              <option>Potato</option>
              <option>Tomato</option>
              <option>Cotton</option>
              <option>Soybean</option>
            </select>
          </div>

          {/* Land */}
          <div>
            <label className="text-sm font-semibold">
              Land Area (acres)
            </label>

            <input
              type="number"
              min="0"
              value={land}
              onChange={(e) => setLand(e.target.value)}
              placeholder="Example: 2"
              className="w-full mt-1 p-3 rounded-xl border bg-background"
            />
          </div>

          {/* Cost */}
          <div>
            <label className="text-sm font-semibold">
              Estimated Farming Cost (₹)
            </label>

            <input
              type="number"
              min="0"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Example: 30000"
              className="w-full mt-1 p-3 rounded-xl border bg-background"
            />
          </div>

          {/* Yield */}
          <div>
            <label className="text-sm font-semibold">
              Expected Yield (kg)
            </label>

            <input
              type="number"
              min="0"
              value={yieldAmount}
              onChange={(e) => setYieldAmount(e.target.value)}
              placeholder="Example: 2000"
              className="w-full mt-1 p-3 rounded-xl border bg-background"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label className="text-sm font-semibold">
              Expected Selling Price (₹ / kg)
            </label>

            <input
              type="number"
              min="0"
              value={sellingPrice}
              onChange={(e) =>
                setSellingPrice(e.target.value)
              }
              placeholder="Example: 25"
              className="w-full mt-1 p-3 rounded-xl border bg-background"
            />
          </div>

          {/* Calculate */}
          <button
            onClick={calculateProfit}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground p-3 font-bold"
          >
            <Calculator className="w-4 h-4" />
            Calculate Profit
          </button>

        </div>

        {/* Result */}
        {result && (
          <div className="mt-5 space-y-3">

            <h2 className="font-bold text-lg">
              {crop} Profit Estimate
            </h2>

            {/* Revenue */}
            <div className="bg-card border rounded-2xl p-4">

              <p className="text-sm text-muted-foreground">
                Expected Revenue
              </p>

              <p className="text-2xl font-black mt-1">
                {formatCurrency(result.revenue)}
              </p>

            </div>

            {/* Cost */}
            <div className="bg-card border rounded-2xl p-4">

              <p className="text-sm text-muted-foreground">
                Farming Cost
              </p>

              <p className="text-2xl font-black mt-1">
                {formatCurrency(Number(cost))}
              </p>

            </div>

            {/* Profit */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">

              <p className="text-sm text-muted-foreground">
                Estimated Profit
              </p>

              <p
                className={`text-3xl font-black mt-1 ${
                  result.profit >= 0
                    ? "text-primary"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(result.profit)}
              </p>

              <p className="text-xs text-muted-foreground mt-2">
                Estimated profit margin:{" "}
                {result.margin.toFixed(1)}%
              </p>

            </div>

          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-5 bg-muted rounded-2xl p-4">

          <p className="text-xs text-muted-foreground leading-5">
            <strong>Note:</strong> This is an estimated calculation
            based on the values entered by the farmer. Actual profit
            may vary depending on market price, yield, weather,
            input costs and other farming conditions.
          </p>

        </div>

      </div>
    </div>
  );
}
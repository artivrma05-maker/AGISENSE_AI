import { motion } from "framer-motion";
import { BarChart3, IndianRupee } from "lucide-react";
import PageHeader from "@/components/PageHeader";

type Expense = {
  id: number;
  category: string;
  amount: number;
  note: string;
};

export default function ExpenseAnalytics() {
  const saved = localStorage.getItem("farmExpenses");

  const expenses: Expense[] = saved ? JSON.parse(saved) : [];

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const categories = [
    "Seeds",
    "Fertilizer",
    "Pesticide",
    "Labour",
    "Irrigation",
    "Equipment",
    "Transport",
    "Other",
  ];

  const categoryTotals = categories.map((category) => {
    const total = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      category,
      total,
      percentage:
        totalExpense > 0
          ? Math.round((total / totalExpense) * 100)
          : 0,
    };
  });

  const highestCategory = categoryTotals.reduce(
    (highest, current) =>
      current.total > highest.total ? current : highest,
    { category: "None", total: 0, percentage: 0 }
  );

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title="Expense Analytics"
        subtitle="Understand where your farming money is going"
      />

      <div className="px-4 space-y-4">

        {/* Total Expense */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-hero rounded-2xl p-5 text-primary-foreground shadow-elevated"
        >
          <p className="text-sm opacity-80">
            Total Farming Expense
          </p>

          <div className="flex items-center gap-1 mt-1">
            <IndianRupee className="w-7 h-7" />

            <h2 className="text-3xl font-black">
              {totalExpense.toLocaleString("en-IN")}
            </h2>
          </div>
        </motion.div>

        {/* Highest Expense */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-bold">
              Highest Expense Category
            </h3>
          </div>

          {highestCategory.total > 0 ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-black">
                  {highestCategory.category}
                </p>
                <p className="text-xs text-muted-foreground">
                  {highestCategory.percentage}% of total expenses
                </p>
              </div>

              <p className="text-xl font-black text-primary">
                ₹{highestCategory.total.toLocaleString("en-IN")}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Add expenses to see analytics.
            </p>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-bold text-lg mb-4">
            Category Breakdown
          </h3>

          <div className="space-y-4">
            {categoryTotals
              .filter((item) => item.total > 0)
              .map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">
                      {item.category}
                    </span>

                    <span className="font-bold">
                      ₹{item.total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-1">
                    {item.percentage}% of total
                  </p>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
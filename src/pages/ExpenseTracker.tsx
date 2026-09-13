import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  IndianRupee,
  BarChart3,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

type Expense = {
  id: number;
  category: string;
  amount: number;
  note: string;
};

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("farmExpenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [category, setCategory] = useState("Seeds");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce(
    (result: Record<string, number>, expense) => {
      result[expense.category] =
        (result[expense.category] || 0) + expense.amount;

      return result;
    },
    {}
  );

  const highestCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

  const addExpense = () => {
    if (!amount || Number(amount) <= 0) return;

    const newExpense: Expense = {
      id: Date.now(),
      category,
      amount: Number(amount),
      note,
    };

    const updatedExpenses = [newExpense, ...expenses];

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "farmExpenses",
      JSON.stringify(updatedExpenses)
    );

    setAmount("");
    setNote("");
  };

  const deleteExpense = (id: number) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "farmExpenses",
      JSON.stringify(updatedExpenses)
    );
  };

  const clearExpenses = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all farming expenses?"
    );

    if (!confirmed) return;

    setExpenses([]);
    localStorage.removeItem("farmExpenses");
  };

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title="Expense Tracker"
        subtitle="Track your farming expenses"
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

          <p className="text-xs opacity-70 mt-2">
            {expenses.length} expense
            {expenses.length !== 1 ? "s" : ""} recorded
          </p>
        </motion.div>

        {/* Expense Insights */}
        {expenses.length > 0 && (
          <div className="grid grid-cols-2 gap-3">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <BarChart3 className="w-5 h-5 text-primary mb-2" />

              <p className="text-lg font-black">
                {Object.keys(categoryTotals).length}
              </p>

              <p className="text-xs text-muted-foreground">
                Categories Used
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <TrendingUp className="w-5 h-5 text-orange-500 mb-2" />

              <p className="text-lg font-black truncate">
                {highestCategory?.[0] || "None"}
              </p>

              <p className="text-xs text-muted-foreground">
                Highest Spending
              </p>
            </motion.div>

          </div>
        )}

        {/* Add Expense */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-bold text-lg mb-4">
            Add Expense
          </h3>

          <div className="space-y-3">

            {/* Category */}
            <div>
              <label className="text-xs text-muted-foreground">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
              >
                <option>Seeds</option>
                <option>Fertilizer</option>
                <option>Pesticide</option>
                <option>Labour</option>
                <option>Irrigation</option>
                <option>Equipment</option>
                <option>Transport</option>
                <option>Other</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs text-muted-foreground">
                Amount (₹)
              </label>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full mt-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
              />
            </div>

            {/* Note */}
            <div>
              <label className="text-xs text-muted-foreground">
                Note
              </label>

              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Tomato seeds"
                className="w-full mt-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={addExpense}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 font-bold"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </button>

          </div>
        </div>

        {/* Category Summary */}
        {expenses.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-primary" />

              <h3 className="font-bold">
                Category Summary
              </h3>
            </div>

            <div className="space-y-3">
              {Object.entries(categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .map(([name, value]) => {
                  const percentage =
                    totalExpense > 0
                      ? Math.round(
                          (value / totalExpense) * 100
                        )
                      : 0;

                  return (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{name}</span>

                        <span className="font-semibold">
                          ₹{value.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <p className="text-[11px] text-muted-foreground mt-1">
                        {percentage}% of total expense
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Recent Expenses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">
              Recent Expenses
            </h3>

            {expenses.length > 0 && (
              <button
                onClick={clearExpenses}
                className="text-xs text-destructive font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-60" />

              <p className="font-semibold">
                No expenses added yet
              </p>

              <p className="text-sm mt-1">
                Add your first farming expense above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between bg-card border border-border rounded-2xl p-4"
                >
                  <div className="min-w-0">
                    <p className="font-bold">
                      {expense.category}
                    </p>

                    {expense.note && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {expense.note}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 ml-3">
                    <p className="font-black text-primary whitespace-nowrap">
                      ₹{expense.amount.toLocaleString("en-IN")}
                    </p>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-destructive"
                      aria-label="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
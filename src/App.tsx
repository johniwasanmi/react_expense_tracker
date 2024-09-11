import { useState } from "react";
import reactLogo from "./assets/react.svg";
import johnImage from "./assets/john.png";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./components/form";
import CategoryTable from "./components/CategoryTable";
import ExpenseFilter from "./components/ExpenseFilter";
import categories from "./categories";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expense, setExpense] = useState([
    {
      id: 1,
      description: "rice",
      amount: 10,
      category: "Food",
    },
    {
      id: 2,
      description: "milk",
      amount: 5,
      category: "Dairy",
    },
    {
      id: 3,
      description: "bread",
      amount: 3,
      category: "Bakery",
    },
    {
      id: 4,
      description: "chicken",
      amount: 12,
      category: "Meat",
    },
    {
      id: 5,
      description: "apples",
      amount: 7,
      category: "Fruits",
    },
    {
      id: 6,
      description: "eggs",
      amount: 4,
      category: "Dairy",
    },
  ]);
  const visibleExpenses = selectedCategory
    ? expense.filter((e) => e.category === selectedCategory)
    : expense;
  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={johnImage} className="logo rounded" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Expense Tracker</h1>
      <Form
        onSubmit={(data) =>
          setExpense([...expense, { ...data, id: expense.length + 1 }])
        }
      />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <CategoryTable
        expense={visibleExpenses}
        onDelete={(id) => setExpense(expense.filter((e) => e.id !== id))}
      />
    </>
  );
}

export default App;

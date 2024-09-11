interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expense: Expense[];
  onDelete: (id: number) => void;
}

const CategoryTable = ({ expense, onDelete }: Props) => {
  if (expense.length == 0) {
    return null;
  }
  function sumTotal(...values: number[]) {
    return values.reduce((total, value) => total + Number(value), 0);
  }

  return (
    <div className="card ">
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {expense.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>${expense.amount}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => onDelete(expense.id)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td>Total</td>
              <td>${sumTotal(...expense.map((exp) => exp.amount))}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;

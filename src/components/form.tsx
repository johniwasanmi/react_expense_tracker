import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import categories from "../categories";

const schema = z.object({
  description: z
    .string()
    .min(3, {
      message:
        "Description is required and muiust be at least three charachters",
    })
    .max(50, { message: "Description must not be more than 30 charachters" }),
  amount: z
    .number({ message: "Amount is required" })
    .min(0.01, { message: "Amount must be at least $5" })
    .max(200, { message: "Amount cant be more than $200" }),
  category: z.enum(categories, { message: "Expense Category is Required" }),
});

type FormData = z.infer<typeof schema>;
interface Props {
  onSubmit: (data: FormData) => void;
}
const Form = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="card">
      <div className="card-body">
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <input
              {...register("description")}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Amount
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              {...register("category")}
              className="form-select"
              id="category"
              aria-label="Default select example"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-danger">{errors.category.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

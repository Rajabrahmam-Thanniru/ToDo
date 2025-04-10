
import * as Yup from "yup";

export const postTaskSchema = Yup.object({
  taskName: Yup.string()
    .required("Task name is required")
    .min(3, "Task name must be at least 3 characters"),
  taskText: Yup.string()
    .required("Task text is required")
    .min(5, "Task text must be at least 5 characters"),
});

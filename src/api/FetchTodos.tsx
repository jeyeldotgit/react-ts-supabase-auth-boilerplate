import { TodoType } from "../types/TodoType";
import supabase from "../supabase-client";

const FetchTodos = async (): Promise<TodoType[] | null> => {
  const { data: todosFromDB, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error("Error fetching from supabase DB:", error);
    return null;
  }

  return todosFromDB as TodoType[];
};

export default FetchTodos;

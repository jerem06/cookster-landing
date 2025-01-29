import { User } from "@/core/models";
import { supabase } from "@/core/services";

export const getUserId = async (supabase_id: string): Promise<Partial<User>> => {
    const { data, error } = await supabase
        .from("users")
        .select("user_id, user_role")
        .eq("supabase_id", supabase_id)
        .single();

    if (error) throw new Error(error.message);

    return data;
}; 
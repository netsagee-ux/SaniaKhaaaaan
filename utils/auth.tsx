import supabase from "../lib/supabase";

// SIGNUP
export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// LOGIN
export const loginUser = async (email, password) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;
  return data;
};

// GET USER
export const getCurrentUser = async () => {
  const { data: { user } } =
    await supabase.auth.getUser();

  return user;
};

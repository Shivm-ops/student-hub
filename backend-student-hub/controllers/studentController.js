const supabase = require("../config/supabase");

/**
 * Fetch all students from Supabase
 */
const getAllStudents = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("students").select("*");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Insert a new student into Supabase
 */
const createStudent = async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ error: "Name, email, and course are required" });
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .insert([{ name, email, course }])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Student created successfully",
      student: data[0],
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a student by ID
 */
const deleteStudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("students").delete().eq("id", id);

    if (error) throw error;

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  deleteStudent,
};

import getDbConnection from "../../utils/db"
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Email and password required" }), { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ message: "Invalid email format" }), { status: 400 });
  }

  try {
    const db = await getDbConnection();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      return new Response(JSON.stringify({ message: "Email already registered!" }), { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed]);

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server Error" }), { status: 500 });
  }
}
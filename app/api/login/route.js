import getDbConnection from "../../../utils/db.js";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password required" }),
        { status: 400 }
      );
    }

    const db = await getDbConnection();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "User not Found!" }),
        { status: 401 }
      );
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid Password" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: { id: user.id, email: user.email },
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

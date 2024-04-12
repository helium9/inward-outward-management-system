import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Employee } from ".prisma/client";
const prisma = new PrismaClient();

interface EmployeeWhereUniqueInput {
  id: string;
  email?: string;
  // Add any other fields if needed
}

export const options: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        // const connect = await mongoose.connect(connection.connection);
        console.log("email :" , credentials?.email);
        console.log("password :" , credentials?.password);

        try {
            // Find user by username

            
            // Assuming the Employee type is defined in your Prisma schema
            const user: Employee | null = await prisma.employee.findFirst({
              where: {
                email: credentials?.email,
              } as EmployeeWhereUniqueInput,
            });
            
            
            
            console.log(user)

            if (!user) {
                throw new Error('User not found');
            }

            // Compare hashed password with provided password using bcrypt
            // const passwordMatch = await bcrypt.compare(credentials.password, user.password);

            if (credentials?.password !== process.env.password || !user.isAdmin) {
                throw new Error('Invalid credentials');
            }

            // If credentials are valid, return user
            return user;
        } catch (error) {
          console.log(error);
            throw error;
        } 
    }
})

  ],
};

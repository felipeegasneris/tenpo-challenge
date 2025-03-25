import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Aquí implementaremos la lógica de autenticación real
        if (credentials?.email === 'test@example.com' && credentials?.password === 'test123') {
          return {
            id: '1',
            email: credentials.email,
            name: 'Test User',
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user = {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          id: token.id as string,
          // Type assertion to extend the User type with id property
          } as { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; id: string
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
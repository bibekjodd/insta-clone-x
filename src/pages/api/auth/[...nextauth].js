import GoogleProvider from 'next-auth/providers/google'
import NextAuth, { providers } from 'next-auth'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
            session.user.uid = token.sub;
            return session;
        }
    }
})
import {Backend_URL} from '@lib/Constants';
import CredentialsProvider from 'next-auth/providers/credentials';
import {AuthOptions} from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const {username, password} = credentials;
        const res = await fetch(Backend_URL + '/auth/login', {
          method: 'post',
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
};

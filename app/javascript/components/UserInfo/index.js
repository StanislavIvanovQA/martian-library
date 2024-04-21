import React, {useRef} from 'react'
import {Query, Mutation, useApolloClient, useQuery, useMutation} from 'react-apollo'
import {Me, SignMeIn} from './operations.graphql'
import cs from './styles'

const UserInfo = () => {
    const input = useRef(null)
    const client = useApolloClient()
    const {data, loading} = useQuery(Me)
    const [signIn, {loading: authenticating, error}] = useMutation(SignMeIn, {
        update: (cache, {data: {signIn}}) => {
            cache.writeQuery({query: Me, data: {me: signIn.user}})
        },
    })

    // handlers

    const onFormSubmit = signIn => event => {
        event.preventDefault()
        signIn({
            variables: {email: input.current.value},
        }).then(({data: {signIn: {token}}}) => {
            if (token) {
                localStorage.setItem('mlToken', token)
            }
        })
    }

    const onLogout = () => {
        localStorage.removeItem('mlToken')
        void client.resetStore()
    }

    // inner components

    const LoginForm = ({error, signIn}) => {
        return (
            <div className={cs.signIn}>
                <form onSubmit={onFormSubmit(signIn)}>
                    <input
                        ref={input}
                        type="email"
                        className={cs.input}
                        placeholder="your email"
                    />
                    <input
                        type="submit"
                        className={cs.button}
                        value="Sign In"
                    />
                    {error && <span className={cs.error}>{error.message}</span>}
                </form>
            </div>
        )
    }

    const SignedIn = ({fullName}) => {
        return (
            <>
                <div className={cs.info}>😈 {fullName}</div>
                <button
                    className={`${cs.button} ${cs.logout}`}
                    onClick={onLogout}
                >
                    Log Out
                </button>
            </>
        )
    }

    // component body

    const Body = () => {
        if (loading) return '...Loading'
        if (!data.me) {
            return authenticating
                ? ('...')
                : <LoginForm error={error} signIn={signIn}/>
        }
        return <SignedIn fullName={data.me.fullName}/>
    }

    return (
        <div className={cs.panel}>
            <Body/>
        </div>
    )
}

export default UserInfo

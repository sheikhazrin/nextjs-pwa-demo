import * as React from 'react'
import LoginForm from '../components/LoginForm'
import Layout from '../components/Layout'

class Login extends React.Component {
    render() {
        return (
            <Layout>
                <LoginForm />
            </Layout>
        )
    }
}

export default Login

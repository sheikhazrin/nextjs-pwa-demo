import * as React from 'react'
import { loginUser } from '../lib/auth'
import Router from 'next/router'

class LoginForm extends React.Component {
    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        loginUser({ email, password }).then(() => Router.push('/dashboard'))
    }

    render() {
        const { email, password } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                        value={email}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                        value={password}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        )
    }
}

export default LoginForm

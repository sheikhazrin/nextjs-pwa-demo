import * as React from 'react'
import { loginUser } from '../lib/auth'
import Router from 'next/router'

class LoginForm extends React.Component {
    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org',
        error: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { email, password } = this.state
        this.setState({
            error: '',
        })
        
        const resp = await loginUser({ email, password })

        if(resp.err_code === 0) {
            Router.push('/dashboard')
        } else {
            this.showError(resp.message)
        }
    }

    showError = err => {
        this.setState({
            error: err,
        })
    }

    render() {
        const { email, password, error } = this.state

        return (
            <React.Fragment>
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
                {error && <div>err: {error}</div>}
            </form>
            <style jsx>{`
                form div {
                    margin: 5px;
                }
                form input {
                    width: 200px
                }
                form button {
                    background: #ec3e3e;
                    color: white;
                    border: none;
                    padding: 8px;
                    cursor: pointer;
                    margin: 5px;
                }
            `}</style>
            </React.Fragment>
        )
    }
}

export default LoginForm

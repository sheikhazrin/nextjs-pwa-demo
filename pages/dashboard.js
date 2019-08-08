import * as React from 'react'
import { getUserProfile } from '../lib/auth'
import Layout from '../components/Layout'

class Dashboard extends React.Component {
    static async getInitialProps() {
        let data = {}
        try {
            data = await getUserProfile()
        } catch (err) {
            console.error(err)
        }

        return { data }
    }

    render() {
        const { data } = this.props
        return (
            <Layout>
                <pre>{JSON.stringify(data.user, null, 2)}</pre>
            </Layout>
        )
    }
}

export default Dashboard

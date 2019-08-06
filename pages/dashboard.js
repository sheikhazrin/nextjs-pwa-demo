import * as React from 'react'
import { getUserProfile } from '../lib/auth'

 class Dashboard extends React.Component {
    static async getInitialProps() {
        let data ={};
        try {
            data = await getUserProfile();
        } catch (err) {
            console.error(err)
        }
        
        return { data }
    }

    render() {
        const { data } = this.props
        return  <div>{JSON.stringify(data.user, null, 2)}</div>
        
    }
}

export default Dashboard
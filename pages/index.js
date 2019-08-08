import * as React from 'react'
import Head from 'next/head'
import '../style/index.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCoffee,
    faFileContract,
    faPhotoVideo,
} from '@fortawesome/free-solid-svg-icons'
import { authInitialProps } from '../lib/auth'
import Layout from '../components/Layout'

class Homepage extends React.Component {
    componentDidMount() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(registration => {
                    console.log(
                        'Service worker is running success',
                        registration
                    )
                })
                .catch(err => {
                    console.warn('Service worker is running fail', err)
                })
        }
    }
    render() {
        return (
            <Layout {...this.props}>
                <Head>
                    <title>Udemy constructor</title>
                </Head>
                {/* <nav className="navbar navbar-light bg-light static-top">
                    <div className="container">
                    <a className="navbar-brand" href="#">Udemy constructor</a>
                        <Link href={`/login`} as={`/login`}>
                            <a className="btn btn-primary" href="#">Sign In</a>
                        </Link>
                    </div>
                </nav> */}
                <header className="masthead text-white text-center">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 mx-auto">
                                <h1>Study any topic, anytime</h1>
                                <h3 className="mb-3">
                                    Explore thousands of courses starting at
                                    $10.99 each
                                </h3>
                            </div>
                            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                <form>
                                    <div className="form-row">
                                        <div className="col-12 col-md-9 mb-2 mb-md-0">
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                placeholder="What do you want to learn..."
                                            />
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <button
                                                type="submit"
                                                className="btn btn-block btn-lg btn-danger"
                                            >
                                                Search!
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>
                {/* <!-- Icons Grid --> */}
                <section className="features-icons bg-light text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <Link
                                    href={`/courses?page=1`}
                                    as={`/courses?page=1`}
                                >
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <div className="features-icons-icon d-flex">
                                            <FontAwesomeIcon
                                                icon={faPhotoVideo}
                                            />
                                        </div>
                                        <h3>100,000 Top rated movie</h3>
                                        <p className="lead mb-0">
                                            Get the top rated movies on TMDb
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex">
                                        <FontAwesomeIcon
                                            icon={faFileContract}
                                        />
                                    </div>
                                    <h3>Expert instruction</h3>
                                    <p className="lead mb-0">
                                        Find the right instructor for you
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex">
                                        <FontAwesomeIcon icon={faCoffee} />
                                    </div>
                                    <h3>Lifetime access</h3>
                                    <p className="lead mb-0">
                                        Learn on your schedule
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}

Homepage.getInitialProps = authInitialProps()

export default Homepage

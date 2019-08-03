import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import Link from 'next/link'

const baseURL = "https://image.tmdb.org/t/p/w300"

class Courses extends React.Component {
    static async getInitialProps({query}) {
        let topRate = {}
        let page = null
        try {
            page = Number(query.page) || 1
            const responseData = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=27135713485d9535feea1b0ee0b96cd4&language=en-US&page=${page}`
            )
            topRate = await responseData.json()
        } catch (err) {
            console.log(err)
        }
        return { topRate }
    }
    render() {
        const { topRate } = this.props

        if (topRate.results.length === 0) {
            return <Error statusCode={503} />
        }

        return (
            <React.Fragment>
                <Head>
                    <title>Top rated Film</title>
                </Head>
                <div className="container">
                {
                    topRate.results.map(film => (
                        <Link href="/courses/[course]" as={`/courses/${film.id}`} key={film.id}>
                            <div className="media">
                                <img src={`${baseURL}/${film.backdrop_path}`} className="mr-3" alt="" />
                                <div className="media-body">
                                    <h3 className="mt-0 title">{film.title}</h3>
                                {film.overview}
                                </div>
                            </div>
                        </Link>
                    ))
                }
                </div>
            <style jsx>{`
                .media {
                    display: flex;
                    cursor: pointer
                }
                margin: 10px
            `}</style>
            </React.Fragment>
        )
    }
}

export default Courses

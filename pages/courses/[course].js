import fetch from 'isomorphic-fetch'
const baseURL = "https://image.tmdb.org/t/p/w300"

const Course = ({ movieInfo }) => {
    if (!movieInfo) return <Error statusCode={503} />
  return (
    <div className="media">
        <img src={`${baseURL}/${movieInfo.backdrop_path}`} className="mr-3" alt="" />
        <div className="media-body">
            <h3 className="mt-0 title">{movieInfo.title}</h3>
        {movieInfo.overview}
        </div>
    </div>
  )
}

Course.getInitialProps = async ({ query }) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${query.course}?api_key=27135713485d9535feea1b0ee0b96cd4&language=en-US`)
    const movieInfo = await res.json()
    return { movieInfo }
  }
  

export default Course
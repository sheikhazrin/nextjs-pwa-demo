import Link from 'next/link'

const Layout = ({ children, auth }) => {
    const { user = {} } = auth || {};
    return (
        <div className="root">
            <nav className="navbar">
                <span>
                    Welcome, <strong>{user.email || 'Guest'}</strong>
                </span>
                <div>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    {user.email ? (
                        <React.Fragment>
                            <Link href="/dashboard">
                                <a>DashBoard</a>
                            </Link>
                            <button>
                                <a>Logout</a>
                            </button>
                        </React.Fragment>
                    ) : (
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    )}
                </div>
            </nav>
            {children}
            <style jsx>{`
                .root {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                .navbar {
                    width: 80%;
                    display: flex;
                    justify-content: space-around;
                }
                a {
                    margin-right: 1.5em;
                    margin-left: 1.5em;
                }
                .root button {
                    background: #fd9a0a;
                    color: white;
                    border: none;
                    text-decoration: none;
                    pointer: cursor;
                }
            `}</style>
        </div>
    )
}

export default Layout

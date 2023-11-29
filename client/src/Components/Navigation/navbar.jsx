import { Link } from "react-router-dom"
import teamLogo from './logo.png';
export default function Navbar()
{
    // const path = window.location.pathname
    return <nav className="nav">
        <img src={teamLogo} style={{ width: '100px', height: '100px' }} alt="Team Logo" />
        <ul>
            <li><Link to="/">Blogging Platform</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
        </ul>
    </nav>
}
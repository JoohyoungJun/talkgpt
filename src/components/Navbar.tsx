import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className='navbar'>
            <Link to="/" className='navbar-link'> Main</Link>
            <Link to="/mypage" className='navbar-link'> My Page</Link>
        </nav>
    );
}

export default Navbar;


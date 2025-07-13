import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '1rem', padding: '10px', backgroundColor: '#eee' }}>
            <Link to="/"> Main</Link>
            <Link to="/mypage"> My Page</Link>
        </nav>
    );
}

export default Navbar;


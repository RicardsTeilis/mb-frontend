import IPage from '../interfaces/page';

const Navbar: React.FC<IPage> = () => {

    return (
        <div>
            <ul>
                <li>Log in</li>
                <li>Users</li>
            </ul>
        </div>
        );
}

export default Navbar;
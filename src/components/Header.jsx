import logo from '../assets/logo.png';

export const Header = () => {
    return (
        <header className="bg-white pt-4 shadow-md">
            <div className="container mx-auto flex items-center justify-center">
                <img src={logo} alt="logo" className="h-10" />
            </div>
        </header>
    );
};
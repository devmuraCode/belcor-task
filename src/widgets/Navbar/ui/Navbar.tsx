import { Avatar, AvatarFallback, AvatarImage } from '@/widgets/Avatar';

import classes from './Navbar.module.scss';

const Navbar = () => {

  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarNav}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <ul className={classes.navLins}>

          {token && <li onClick={logout}>Log Out</li>}
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

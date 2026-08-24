import { NavLink, useNavigate } from 'react-router-dom';
import { clearSession } from '../api.js';

const NAV_BY_ROLE = {
  customer: [
    { to: '/orders/new', label: 'Place an Order' },
    { to: '/orders', label: 'My Orders' },
  ],
  agent: [
    { to: '/agent', label: 'My Deliveries' },
  ],
  admin: [
    { to: '/orders', label: 'All Orders' },
    { to: '/orders/new', label: 'Place an Order' },
    { to: '/admin/zones', label: 'Zones & Areas' },
    { to: '/admin/rates', label: 'Rate Cards' },
    { to: '/admin/agents', label: 'Agents' },
  ],
};

export default function Layout({ user, children }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  const links = NAV_BY_ROLE[user.role] || [];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">Last-Mile<span className="dot">.</span></div>
          <nav className="topnav">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                end={link.to === '/orders' || link.to === '/agent'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="topbar-user">
            <span className="role-badge">{user.role}</span>
            <div className="user-meta">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}

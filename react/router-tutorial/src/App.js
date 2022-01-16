import { Outlet, Link } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
      <nav
        style={{
          borderBottom: '1px solid',
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> | {" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
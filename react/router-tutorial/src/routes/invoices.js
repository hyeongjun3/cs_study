import { Outlet, Link } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
    let invoices = getInvoices();

    return (
      <div style={{display: "flex"}}>
          <nav
          style={{
            borderRight: "1px solid",
            padding: "1rem"
          }}>
              {invoices.map(invoice => (
                  <Link
                    style={{ display: "block", margin: "1rem 0" }}
                    to={`/invoices/${invoice.number}`}
                    key={invoice.number}
                  >
                  {invoice.name}
                  </Link>
              ))}
          </nav>
          <Outlet></Outlet>
      </div>
    );
  }
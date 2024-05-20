import { revenue, Invoices, customers } from "@/app/lib/placeholder-data";
import { formatCurrency } from "@/app/lib/utils";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("Hello");
    sleep(10000).then(() => {
      console.log("World!");
    });

    const data = revenue;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = Invoices;

    const latestInvoices = data.rows.map((invoice, index) => ({
      id: index,
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = Invoices.rows.length;
    const customerCountPromise = customers.rows.length;
    const invoiceStatus = { pending: 0, paid: 0 };
    Invoices.rows.map((invoice) => {
      if (invoice.status == "paid") {
        invoiceStatus.paid += 1;
      } else if (invoice.status == "pending") invoiceStatus.pending += 1;
    });

    const numberOfInvoices = Number(invoiceCountPromise ?? "0");
    const numberOfCustomers = Number(customerCountPromise ?? "0");
    const totalPaidInvoices = formatCurrency(invoiceStatus.paid ?? "0");
    const totalPendingInvoices = formatCurrency(invoiceStatus.pending ?? "0");

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

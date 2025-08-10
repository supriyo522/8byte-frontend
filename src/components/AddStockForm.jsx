import React, { useState } from 'react';

function AddStockForm({ onAddStock }) {
  const [form, setForm] = useState({
    name: '',
    ticker: '',
    exchange: '',
    sector: '',
    purchasePrice: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const investment = parseFloat(form.purchasePrice) * parseInt(form.quantity);
    onAddStock({ ...form, purchasePrice: parseFloat(form.purchasePrice), quantity: parseInt(form.quantity), investment });
    setForm({
      name: '',
      ticker: '',
      exchange: '',
      sector: '',
      purchasePrice: '',
      quantity: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" placeholder="Stock Name" value={form.name} onChange={handleChange} required />
      <input name="ticker" placeholder="Ticker" value={form.ticker} onChange={handleChange} required />
      <input name="exchange" placeholder="Exchange" value={form.exchange} onChange={handleChange} required />
      <input name="sector" placeholder="Sector" value={form.sector} onChange={handleChange} required />
      <input name="purchasePrice" placeholder="Purchase Price" type="number" step="0.01" value={form.purchasePrice} onChange={handleChange} required />
      <input name="quantity" placeholder="Quantity" type="number" value={form.quantity} onChange={handleChange} required />
      <button type="submit">Add Stock</button>
    </form>
  );
}

export default AddStockForm;

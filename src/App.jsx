import React, { useEffect, useState } from 'react';
import PortfolioTable from './components/PortfolioTable';
import AddStockForm from './components/AddStockForm';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://eightbyte-backend.onrender.com/api/portfolio');
      const data = await res.json();
      setPortfolio(data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
    setLoading(false);
  };

  const updateLiveData = async () => {
    try {
      await fetch('http://localhost:5000/api/portfolio/update', {
        method: 'PUT'
      });
      fetchPortfolio();
    } catch (error) {
      console.error("Error updating live data:", error);
    }
  };

  const handleAddStock = async (stock) => {
    try {
      await fetch('http://localhost:5000/api/portfolio/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stock)
      });
      fetchPortfolio();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 15000); // refresh every 15 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>📊 Portfolio Dashboard</h1>
      <div className="controls">
        <button onClick={fetchPortfolio}>Refresh</button>
        <button onClick={updateLiveData}>Update Live Data</button>
      </div>
      {loading ? <p>Loading...</p> : <PortfolioTable data={portfolio} />}
      <h2>Add New Stock</h2>
      <AddStockForm onAddStock={handleAddStock} />
    </div>
  );
}

export default App;

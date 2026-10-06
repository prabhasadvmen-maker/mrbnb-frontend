export const formatPrice = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return currency === 'USD' ? '$0' : '₹0';
  }
  const num = Number(amount);
  if (currency === 'USD') {
    const usd = Math.round(num / 85);
    return `$${usd.toLocaleString('en-US')}`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
};

export const formatCurrency = formatPrice;

export const generateBookingId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `MRB-${year}-${randomNum}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

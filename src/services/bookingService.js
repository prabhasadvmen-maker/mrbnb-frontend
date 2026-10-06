/**
 * Booking Service for reservations, GST invoice generation, and status lookups
 */
export const bookingService = {
  async createReservation(bookingData) {
    const bookingId = `MRB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      ...bookingData,
      bookingId,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    return Promise.resolve(newBooking);
  },

  async generateInvoice(bookingId) {
    return Promise.resolve({
      invoiceId: `INV-${bookingId}`,
      pdfUrl: `/invoices/${bookingId}.pdf`,
      generatedAt: new Date().toISOString()
    });
  }
};

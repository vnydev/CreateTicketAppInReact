const TicketsContainer = [];

export const StoreTickets = value => {
  if (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        TicketsContainer.push(value);
        resolve(TicketsContainer);
      }, 2000);
    });
  } else {
    return TicketsContainer;
  }
};

export const updateTicketById = ticket => {
  TicketsContainer.filter(item => {
    if (item.Id == ticket.Id) {
      item.Status = ticket.Status;
    }
    return item;
  });
};

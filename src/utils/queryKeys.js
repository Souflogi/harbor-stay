// Centralized query keys for all React Query operations
// Organized by feature to avoid hardcoded strings

export const queryKeys = {
  cabins: {
    all: ["cabins"],
    list: ["cabins", "list"],
    detail: id => ["cabins", id],
  },
  bookings: {
    all: ["bookings"],
    list: ["bookings", "list"],
    detail: id => ["bookings", id],
  },
  guests: {
    all: ["guests"],
    list: ["guests", "list"],
    detail: id => ["guests", id],
  },
  settings: {
    all: ["settings"],
  },
  auth: {
    user: ["auth", "user"],
    profile: ["auth", "profile"],
  },
  dashboard: {
    stats: ["dashboard", "stats"],
  },
};

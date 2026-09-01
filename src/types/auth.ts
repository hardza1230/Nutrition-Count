export type User = {
  id: string;
  email: string;
  createdAt: string;
  dailyCaloricTarget: number;
  dailyProteinTarget: number;
  dailyCarbsTarget: number;
  dailyFatTarget: number;
  dailyFiberTarget: number;
  dailySodiumLimit: number;
};

export type AuthSession = {
  user: User;
  token: string;
};

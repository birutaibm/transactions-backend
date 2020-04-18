import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionCreationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions.map(transaction => ({ ...transaction }));
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (balance, transaction) => {
        let { income, outcome, total } = balance;
        if (transaction.type === 'income') {
          income += transaction.value;
          total += transaction.value;
        } else {
          outcome += transaction.value;
          total -= transaction.value;
        }
        return { income, outcome, total };
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create(transactionData: TransactionCreationDTO): Transaction {
    const transaction = new Transaction(transactionData);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

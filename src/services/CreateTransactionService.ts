import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionCreationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionData: TransactionCreationDTO): Transaction {
    if (
      transactionData.type === 'outcome' &&
      transactionData.value > this.transactionsRepository.getBalance().total
    ) {
      throw Error('You do not have money for this enought transaction');
    }
    return this.transactionsRepository.create(transactionData);
  }
}

export default CreateTransactionService;

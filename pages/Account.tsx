
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Transaction } from '../types';
import { BankIcon, ArrowUpIcon, ArrowDownIcon } from '../components/icons';

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
    const { translations } = useTranslation();
    const isDeposit = transaction.type === 'deposit';
    const isWithdrawal = transaction.type === 'withdrawal';
  
    const typeText = {
      deposit: translations.accountPage.deposit,
      withdrawal: translations.accountPage.withdrawal,
      payment: translations.accountPage.payment,
    };
  
    return (
      <li className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-primary transition-colors duration-200">
        <div className="flex items-center">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isDeposit ? 'bg-green-500/20 text-green-400' : isWithdrawal ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {isDeposit ? <ArrowUpIcon/> : <ArrowDownIcon/>}
          </div>
          <div className="ms-4">
            <p className="text-md font-medium text-accent">{transaction.description}</p>
            <p className="text-sm text-gray-400">{transaction.date} - <span className="font-semibold">{typeText[transaction.type]}</span></p>
          </div>
        </div>
        <p className={`text-md font-semibold ${isDeposit ? 'text-green-400' : 'text-red-400'}`}>
          {isDeposit ? '+' : '-'}{transaction.amount}
        </p>
      </li>
    );
};

const Account = () => {
    const { translations } = useTranslation();
    const userName = "محمد الأيوبي"; // Mock user name

    const transactions: Transaction[] = [
        { id: 1, type: 'deposit', description: translations.accountPage.depositFromBank, amount: '500,000 ل.س', date: '2024-07-20' },
        { id: 2, type: 'payment', description: translations.accountPage.paymentToStore, amount: '75,000 ل.س', date: '2024-07-19' },
        { id: 3, type: 'withdrawal', description: translations.accountPage.atmWithdrawal, amount: '100,000 ل.س', date: '2024-07-18' },
        { id: 4, type: 'deposit', description: translations.accountPage.depositFromBank, amount: '200,000 ل.س', date: '2024-07-15' },
    ];

    return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-highlight">{translations.accountPage.title}</h1>
        <p className="mt-2 text-lg text-gray-300">{translations.accountPage.welcome} {userName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Balance and Bank Info */}
        <div className="lg:col-span-1 space-y-8">
            {/* Balance Card */}
            <div className="bg-secondary p-6 rounded-lg shadow-xl">
                <h2 className="text-lg font-semibold text-gray-400 mb-2">{translations.accountPage.currentBalance}</h2>
                <p className="text-4xl font-bold text-highlight">1,250,000 ل.س</p>
                 <div className="mt-6 flex space-x-4 rtl:space-x-reverse">
                    <button className="flex-1 bg-highlight text-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300">{translations.accountPage.addFunds}</button>
                    <button className="flex-1 bg-gray-600 text-accent font-bold py-3 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-300">{translations.accountPage.withdraw}</button>
                </div>
            </div>

            {/* Bank Card */}
            <div className="bg-secondary p-6 rounded-lg shadow-xl">
                <h2 className="text-lg font-semibold text-gray-400 mb-4">{translations.accountPage.linkedBankAccount}</h2>
                <div className="flex items-center">
                    <BankIcon />
                    <div className="ms-4">
                        <p className="font-bold text-accent text-lg">{translations.accountPage.bankName}</p>
                        <p className="text-gray-400">{translations.accountPage.accountNumber} <span className="font-mono">SY...1234</span></p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Recent Transactions */}
        <div className="lg:col-span-2 bg-secondary p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold text-accent mb-4">{translations.accountPage.recentTransactions}</h2>
          <ul className="divide-y divide-gray-700">
            {transactions.map(tx => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}
          </ul>
        </div>
      </div>
    </div>
    );
};

export default Account;

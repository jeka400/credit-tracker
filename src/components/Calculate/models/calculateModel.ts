export interface IInstallment {
    date: string;
    installment: number;
  }
  
  export const calculateInstallments = (
    principal: number,
    months: number,
    interestRate: number,
    euribor: number,
    firstPaymentMonth: number,
    firstPaymentYear: number,
    paymentDay: number
  ): IInstallment[] => {
    const installments: IInstallment[] = [];
    let remainingDebtAmount = principal;
  
    for (let i = 0; i < months; i++) {
      const totalRate = interestRate + euribor;
      const monthlyInterestRate = totalRate / 12 / 100;
      const installment =
        (remainingDebtAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
        (Math.pow(1 + monthlyInterestRate, months) - 1);
      
      const paymentDate = new Date(firstPaymentYear, firstPaymentMonth - 1 + i, paymentDay);
      const formattedDate = paymentDate.toISOString().split('T')[0];
      
      installments.push({ date: formattedDate, installment });
      remainingDebtAmount -= installment - (principal * monthlyInterestRate);
    }
  
    return installments;
  };
  
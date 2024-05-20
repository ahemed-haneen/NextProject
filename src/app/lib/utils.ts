import { Revenue } from './definitions';

export const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const generateYAxis = (revenue: Revenue[]) => {
    // Calculate what labels we need to display on the y-axis
    // based on highest record and in 1000s
    const yAxisLabels = [];
    const highestRecord = Math.max(...revenue.map((month) => month.revenue));
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;
  
    for (let i = topLabel; i >= 0; i -= 1000) {
      yAxisLabels.push(`$${i / 1000}K`);
    }
  
    return { yAxisLabels, topLabel };
  };
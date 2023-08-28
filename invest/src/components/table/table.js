import styles from './t.module.css';

function formatOutput(n) {
    return n.toFixed(2);
}

export default function Table({data}) {
    console.log('Table');
    console.log(data);
    return <table className={styles.result}>
        <thead>
        <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
        </tr>
        </thead>
        <tbody>
        {data.yearlyData.map(entry => <tr key={entry.year}>
            <td>{entry.year}</td>
            <td>{formatOutput(entry.savingsEndOfYear)}</td>
            <td>{formatOutput(entry.yearlyInterest)}</td>
            <td>{formatOutput(entry.savingsEndOfYear - data.initialInvestment - entry.yearlyContribution * entry.year)}</td>
            <td>{formatOutput(data.initialInvestment + entry.yearlyContribution * entry.year)}</td>
        </tr>)}
        {data.length === 0 && <tr><td colSpan={5} style={{textAlign: 'center'}}>No data</td></tr>}
        </tbody>
    </table>
}
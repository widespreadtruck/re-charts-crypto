import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import dayjs from 'dayjs';

const styles = {
    container: {
        maxHeight: "100vh",
        maxWidth: "100vw",
        margin: "0 auto",
    }
};

const Graph = ({ data }) => {

    let dataArr = [];
    let maxPrice = 20000;

    for ( let i = 0; i < data.length; i++) {
        const price = data[i].[1].toFixed(4);
        const date = dayjs(data[i].[0]).format('D/MMM/YY');

        dataArr.push({
            date,
            price
        });
    };
    maxPrice = Math.max(...dataArr.map(i => i.price), 0).toFixed();
    // console.log('max:', maxPrice);
    // console.log("dataArr:", dataArr);
    const minMaxYValues = [0, dataMax => (Number(maxPrice) + 500)];

    return (
        <div style={styles.container}>
            <AreaChart width={800} height={400} data={dataArr}
                margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <XAxis dataKey="date" />
                <YAxis interval={0} type="number" domain={minMaxYValues}/>
                <Area dataKey="price" stroke='none' fill='#009FFF'/>
            </AreaChart>
        </div>
    )
}

export default Graph;

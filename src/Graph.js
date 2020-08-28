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
        const date = dayjs(data[i].[0]).format('DD/MM/YYYY');
        const price = data[i].[1].toFixed(4);

        dataArr.push({
            date,
            price
        })
    };
    maxPrice = Math.max(...dataArr.map(i => i.price), 0).toFixed();
    // console.log('max:', maxPrice);
    // console.log("dataArr:", dataArr);

    return (
        <div style={styles.container}>
            <AreaChart width={800} height={400} data={dataArr}
                margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <XAxis dataKey="date" />
                <YAxis interval="preserveEnd" type="number" domain={[0, dataMax => (Number(maxPrice) + 500)]}/>
                <Area dataKey="price" stroke='none' fill='#8884d8'/>
            </AreaChart>
        </div>
    )
}

export default Graph

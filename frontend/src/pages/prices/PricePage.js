import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Table } from 'antd';
import PriceByDateRangeGraph from './graphs/PriceByDateRangeGraph';

const { Column, ColumnGroup } = Table;

function PricePage() {
  const [startDate, setStartDate] = useState("2021-10-10");
  const [endDate, setEndDate] = useState("2021-10-14");
  const [prices, setPrices] = useState([]);
  const [pricesByDateRangeData, setPricesByDateRangeData] = useState([]);
  const [renderPricesByDateRangeData, setRenderPricesByDateRangeData] = useState(false);

  const fetchPrices = (startDate, endDate) => {
    api.get(`/api/priceByDateRange?startdate=${startDate}&enddate=${endDate}`)
      .then((resp) => {
        if (resp.status !== 200) {
          return;
        }
        setPrices([...resp.data.results])
      })
  };
  useEffect(() => {
    fetchPrices(startDate, endDate);
  }, []);

  useEffect(()=>{
    setPricesByDateRangeData({
      name: "Price By Date",
      color: "#000000",
      items: prices.map((d) => ({ ...d, date: new Date(d.Date), value: d.High }))
    })
    setRenderPricesByDateRangeData(true);
  }, [prices]);

  const dimensions = {
    width: 600,
    height: 300,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 60
    }
  };

  return (
    <div>
      <Table onRow={(record, rowIndex) => {
          // return {
          // onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
          // };
      }} dataSource={prices} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
          <ColumnGroup title="Time">
            <Column title="Timestamp" dataIndex="Timestamp" key="Timestamp" sorter= {(a, b) => a.Timestamp.localeCompare(b.Timestamp)}/>
            {/* <Column title="Away" dataIndex="Away" key="Away" sorter= {(a, b) => a.Away.localeCompare(b.Away)}/> */}
          </ColumnGroup>
          <ColumnGroup title="Prices">
            <Column title="Open" dataIndex="Open" key="Open" sorter= {(a, b) => a.Open - b.Open}/>
            <Column title="Close" dataIndex="CLose" key="CLose" sorter= {(a, b) => a.CLose - b.CLose}/>
          </ColumnGroup>
          <Column title="Date" dataIndex="Date" key="Date"/>
          <Column title="Time" dataIndex="Time" key="Time"/>
      </Table>
      <table>
        {
          // prices.map((price, index) => {
          //   // "Timestamp":1444435200,"Date":"2015-10-10 00:00:00","Symbol":"BTC/US","Open":245.39,"High":245.39,"Low":245.39,"CLose":245.39,"Volume_Crypto":0,"Volume_Currency":0
          //   return (
          //     <tr>
          //       {price.Timestamp}{price.CLose}
          //     </tr>
          //   ) // TODO, change variable name. 
          // })
        }
      </table>
      {console.log(pricesByDateRangeData)}
      {
        // pricesByDateRangeData.map(e=>e.CLose)
      }
      {renderPricesByDateRangeData ? 
          <PriceByDateRangeGraph
              data={[pricesByDateRangeData]}
              dimensions={dimensions}
          /> : <div>no graph</div>
      }
    </div>
  );
}
  
export default PricePage;

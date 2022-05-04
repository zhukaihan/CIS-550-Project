import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Table } from 'antd';
import PriceByDateRangeGraph from './graphs/PriceByDateRangeGraph';

const { Column, ColumnGroup } = Table;

function PricePage() {
  const [startDate, setStartDate] = useState("2015-10-10");
  const [endDate, setEndDate] = useState("2015-10-11");
  const [prices, setPrices] = useState([]);
  const [pricesByDateRangeData, setPricesByDateRangeData] = useState([]);

  const fetchPrices = (startDate, endDate) => {
    api.get(`/api/priceByDateRange?startdate=${startDate}&enddate=${endDate}`)
      .then((resp) => {
        if (resp.status !== 200) {
          return;
        }
        setPrices(resp.data.results)
      })
  };
  useEffect(() => {
    fetchPrices(startDate, endDate);
  }, []);

  useEffect(()=>{
      setPricesByDateRangeData({
        name: "Portfolio",
        color: "#ffffff",
        items: prices.map((d) => ({ ...d, date: new Date(d.date) }))
      })
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
            <Column title="Date" dataIndex="Date" key="Date" sorter = {(a, b) => a.Date.localeCompare(b.Date)}/>
            <Column title="Timestamp" dataIndex="Timestamp" key="Timestamp" sorter = {(a, b) => a.Timestamp.localeCompare(b.Timestamp)}/>
          </ColumnGroup>
          <Column title="Symbol" dataIndex="Symbol" key="Symbol"/>
          <ColumnGroup title="Prices">
            <Column title="Open" dataIndex="Open" key="Open" sorter= {(a, b) => a.Open - b.Open}/>
            <Column title="Close" dataIndex="CLose" key="CLose" sorter= {(a, b) => a.CLose - b.CLose}/>
            <Column title="High" dataIndex="High" key="High" sorter= {(a, b) => a.High - b.High}/>
            <Column title="Low" dataIndex="Low" key="Low" sorter= {(a, b) => a.Low - b.Low}/>
          </ColumnGroup>
          <ColumnGroup title="Volume">
            <Column title="Volume_Crypto" dataIndex="Volume_Crypto" key="Volume_Crypto" sorter= {(a, b) => a.Volume_Crypto - b.Volume_Crypto}/>
            <Column title="Volume_Currency" dataIndex="Volume_Currency" key="Volume_Currency" sorter= {(a, b) => a.Volume_Currency - b.Volume_Currency}/>
          </ColumnGroup>
      </Table>

      {
        //   <PriceByDateRangeGraph
        //       data={[prices]}
        //       dimensions={dimensions}
        //   />
      }
    </div>
  );
}
  
export default PricePage;

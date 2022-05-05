import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Table, Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import PriceByDateRangeGraph from './graphs/PriceByDateRangeGraph';

const { Column, ColumnGroup } = Table;

// const DEFAULT_START_DATE = "2015-10-10";
// const DEFAULT_END_DATE = "2015-10-11";
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_RANGE_FORMAT = 'YYYY-MM-DD';

function PriceAboveMA() {
  const [prices, setPrices] = useState([]);
  // const [pricesByDateRangeData, setPricesByDateRangeData] = useState([]);
  // const [renderPricesByDateRangeData, setRenderPricesByDateRangeData] = useState(false);

  const fetchPrices = () => {
    api.get(`/api/aboveMovingAverage`)
      .then((resp) => {
        if (resp.status !== 200) {
          return;
        }
        setPrices([...resp.data.results]);
      })
  };
  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div>
      <Table onRow={(record, rowIndex) => {
          return {
            onClick: e => {
              window.location = `/prices?startdate=${moment(record.Date, DATE_FORMAT).subtract(10, "hours").format(DATE_RANGE_FORMAT)}&enddate=${moment(record.Date, DATE_FORMAT).add(1, "day").format(DATE_RANGE_FORMAT)}`
            },
          };
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
    </div>
  );
}
  
export default PriceAboveMA;

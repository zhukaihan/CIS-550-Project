import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import api from '../../api';
import { Table, Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import PriceByDateRangeGraph from './graphs/PriceByDateRangeGraph';

const { Column, ColumnGroup } = Table;

const DEFAULT_START_DATE = "2015-10-10";
const DEFAULT_END_DATE = "2015-10-11";
const DATE_FORMAT = 'YYYY-MM-DD';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function PricePage() {
  const [prices, setPrices] = useState([]);
  const [pricesByDateRangeData, setPricesByDateRangeData] = useState([]);
  const [renderPricesByDateRangeData, setRenderPricesByDateRangeData] = useState(false);
  
  let history = useHistory();
  let query = useQuery();
  let dateStartQuery = query.get("startdate");
  let dateEndQuery = query.get("enddate");
  
  if (dateStartQuery === null) {
    dateStartQuery = DEFAULT_START_DATE;
  }
  if (dateEndQuery === null) {
    dateEndQuery = DEFAULT_END_DATE;
  }

  const fetchPrices = (startDate, endDate) => {
    api.get(`/api/priceByDateRange?startdate=${startDate}&enddate=${endDate}`)
      .then((resp) => {
        if (resp.status !== 200) {
          return;
        }
        setPrices([...resp.data.results]);
      })
  };
  useEffect(() => {
    fetchPrices(dateStartQuery, dateEndQuery);
  }, [dateStartQuery, dateEndQuery]);

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
      <Form name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true, startDate: moment(dateStartQuery, DATE_FORMAT), endDate: moment(dateEndQuery, DATE_FORMAT)}}
        onFinish={(input) => {history.push(`/prices?startdate=${input.startDate.format(DATE_FORMAT)}&enddate=${input.endDate.format(DATE_FORMAT)}`)}}
        autoComplete="off"
      >
        <Form.Item label="StartDate" name="startDate" rules={[{required: true}]}>
          <DatePicker format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item label="EndDate" name="endDate" rules={[{required: true}]}>
          <DatePicker format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>

      <Table onRow={(record, rowIndex) => {
          return {
            onClick: e => {window.location = `/priceByTime?date=${record.Date}`}, // clicking a row takes the user to a detailed view of the price given the time. 
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

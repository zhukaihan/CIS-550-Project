import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import api from '../../api';
import { Table, Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

const { Column, ColumnGroup } = Table;

const DEFAULT_DATE = "2015-10-10 00:00:00";
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function PriceByTime() {
  const [prices, setPrices] = useState([]);
  
  let history = useHistory();
  let query = useQuery();
  let dateQuery = query.get("date");
  
  if (dateQuery === null) {
    dateQuery = DEFAULT_DATE;
  }


  const fetchPrices = (date) => {
    history.push(`/priceByTime?date=${date}`)
    api.get(`/api/priceByTime?date=${date}`)
      .then((resp) => {
        if (resp.status !== 200) {
          return;
        }
        setPrices([...resp.data.results]);
      })
  };

  useEffect(() => {
    // Read date from query. 
    fetchPrices(dateQuery);
  }, [dateQuery]);

  return (
    <div>
      <Form name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={(input) => {fetchPrices(input.date.format(DATE_FORMAT))}}
        autoComplete="off"
      >
        <Form.Item label="Date" name="date" rules={[{required: true}]}>
          <DatePicker showTime defaultValue={moment(dateQuery, DATE_FORMAT)} format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>

      <Table dataSource={prices} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
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

export default PriceByTime;

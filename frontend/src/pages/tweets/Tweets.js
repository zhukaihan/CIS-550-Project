import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    //Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    DatePicker 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import {getTweetsSearch}  from '../../fetcher'


class Tweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: '2021-02-08',
            endDate: '2021-02-10',
            tweetsResults: [],
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleStartDateQueryChange = this.handleStartDateQueryChange.bind(this)
        this.handleEndDateQueryChange = this.handleEndDateQueryChange.bind(this)
    }


    handleStartDateQueryChange(event) {
        this.setState({ startDate: event.target.value })
    }

    handleEndDateQueryChange(event) {
        this.setState({ endDate: event.target.value })
    }


    updateSearchResults() {
        getTweetsSearch(this.state.startDate, this.state.endDate).then(res => {
            console.log(res.results)
            this.setState({ tweetsResults: res.results })
        })
        console.log("Hi")
    }

    componentDidMount() {
        getTweetsSearch(this.state.startDate, this.state.endDate).then(res => {
            console.log(res.results)
            console.log("Hi")
            this.setState({ tweetsResults: res.results })
        })
    }

    render() {

        return (
            
            <div>

                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Start Date</label>
                            <FormInput placeholder="Start Date" value={this.state.startDate} onChange={this.handleStartDateQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>End Date</label>
                            <FormInput placeholder="End Date" value={this.state.endDate} onChange={this.handleEndDateQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                    </FormGroup></Col>
                    <br></br>


                </Form>
                <Divider />
                
                <Table style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }} onRow={(record, rowIndex) => {
                    return {
                        onClick: e => {window.location = `/priceByTime?date=${record.Date}`},
                    };
                }} dataSource={this.state.tweetsResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                    <Col title="Date" dataIndex="date" key="Date" sorter = {(a, b) => a.date.localeCompare(b.date)}/>
                    <Col title="User" dataIndex="user_name" key="user_name"/> 
                    <Col title="Tweet" dataIndex="text" key="text"/>
                </Table>

            </div>
        )
    }
}

export default Tweets;

